const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

/**
 * Video progress and quiz status computation
 */
function computeVideoProgressAndQuiz(video, userId) {
  const progress = video.watchLogs?.[0] || {
    totalWatchTime: 0,
    isCompleted: false,
    watchedPercentage: 0.0,
  };

  const quizStatus = video.quiz ? {
    hasQuiz: true,
    isUnlocked: video.watchLogs?.[0]?.isCompleted || false,
    attemptCount: video.quiz.attempts?.length || 0,
    bestScore: video.quiz.attempts?.length > 0 
      ? Math.max(...video.quiz.attempts.map(a => a.score)) 
      : 0,
    lastAttempt: video.quiz.attempts?.length > 0 
      ? video.quiz.attempts[video.quiz.attempts.length - 1] 
      : null
  } : { hasQuiz: false };

  return { progress, quizStatus };
}

/**
 * Compute course-level progress metrics
 */
function computeCourseProgress(courseVideos) {
  const totalVideos = courseVideos.length;
  const completedVideos = courseVideos.filter(cv => 
    cv.video.watchLogs?.[0]?.isCompleted
  ).length;

  // Calculate quiz statistics
  const videosWithQuizzes = courseVideos.filter(cv => cv.video.quiz);
  const totalQuizzes = videosWithQuizzes.length;
  const completedQuizzes = videosWithQuizzes.filter(cv => 
    cv.video.quiz.attempts && cv.video.quiz.attempts.length > 0
  ).length;

  const totalDuration = courseVideos.reduce((sum, cv) => sum + (cv.video.duration || 0), 0);
  const totalWatchTime = courseVideos.reduce((sum, cv) => 
    sum + (cv.video.watchLogs?.[0]?.totalWatchTime || 0), 0
  );

  const completionPercentage = totalDuration > 0 
    ? (totalWatchTime / totalDuration) * 100 
    : 0;
  
  const averageProgress = totalVideos > 0 ? courseVideos.reduce((sum, cv) => 
    sum + (cv.video.watchLogs?.[0]?.watchedPercentage || 0), 0
  ) / totalVideos : 0;

  // Calculate separate completion percentages
  const videoCompletionPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
  const quizCompletionPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 100;

  // Calculate overall completion percentage (weighted: 70% video, 30% quiz)
  const overallCompletionPercentage = totalQuizzes > 0 
    ? (videoCompletionPercentage * 0.7) + (quizCompletionPercentage * 0.3)
    : videoCompletionPercentage;

  // Course is fully completed only if both videos and quizzes are done
  const isCompleted = completedVideos === totalVideos && completedQuizzes === totalQuizzes;

  return {
    totalVideos,
    completedVideos,
    completionPercentage,
    totalWatchTime,
    averageProgress: averageProgress || 0,
    totalQuizzes,
    completedQuizzes,
    videoCompletionPercentage,
    quizCompletionPercentage,
    overallCompletionPercentage,
    isCompleted,
    totalDuration
  };
}

/**
 * Standard video include clause with user-specific data
 */
function getVideoIncludeClause(userId) {
  return {
    watchLogs: userId ? {
      where: { userId },
      select: {
        totalWatchTime: true,
        isCompleted: true,
        watchedPercentage: true,
        updatedAt: true,
        lastUpdateTime: true,
      }
    } : false,
    quiz: {
      include: {
        attempts: userId ? {
          where: { userId },
          select: {
            id: true,
            score: true,
            completedAt: true,
          }
        } : false
      }
    }
  };
}

/**
 * Get course assignment status for user
 */
async function getCourseAssignmentStatus(courseId, userId) {
  if (!userId) return false;
  
  const assignment = await prisma.courseAssignment.findFirst({
    where: { courseId: parseInt(courseId), userId }
  });
  
  return !!assignment;
}

/**
 * Check if user is assigned to any course containing the video
 */
async function checkVideoAssignment(videoId, userId) {
  if (!userId) return false;

  const video = await prisma.video.findUnique({
    where: { id: parseInt(videoId) },
    select: {
      courseVideos: {
        select: {
          course: {
            select: {
              assignments: {
                where: { userId },
                select: { id: true }
              }
            }
          }
        }
      }
    }
  });

  return video?.courseVideos.some(cv => 
    cv.course.assignments.length > 0
  ) || false;
}

module.exports = {
  computeVideoProgressAndQuiz,
  computeCourseProgress,
  getVideoIncludeClause,
  getCourseAssignmentStatus,
  checkVideoAssignment
};
