const calculateCourseProgress = (courseVideos, userId) => {
  const totalVideos = courseVideos.length;
  const completedVideos = courseVideos.filter(cv =>
    cv.video.watchLogs?.some(log => log.userId === userId && log.isCompleted)
  ).length;

  const videosWithQuizzes = courseVideos.filter(cv => cv.video.quiz);
  const totalQuizzes = videosWithQuizzes.length;
  const completedQuizzes = videosWithQuizzes.filter(cv =>
    cv.video.quiz.attempts?.some(attempt => attempt.userId === userId)
  ).length;

  const totalWatchTime = courseVideos.reduce((sum, cv) => {
    const userLog = cv.video.watchLogs?.find(log => log.userId === userId);
    return sum + (userLog?.totalWatchTime || 0);
  }, 0);

  const videoCompletionPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0;
  const quizCompletionPercentage = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 100;
  const overallProgress = totalQuizzes > 0
    ? (videoCompletionPercentage * 0.7) + (quizCompletionPercentage * 0.3)
    : videoCompletionPercentage;

  return {
    totalVideos,
    completedVideos,
    totalQuizzes,
    completedQuizzes,
    totalWatchTime: totalWatchTime / 3600, // Convert to hours
    videoCompletionPercentage: Math.round(videoCompletionPercentage),
    quizCompletionPercentage: Math.round(quizCompletionPercentage),
    overallProgress: Math.round(overallProgress),
    isCompleted: completedVideos === totalVideos && completedQuizzes === totalQuizzes,
  };
};

const calculateQuizStats = (attempts) => {
  if (attempts.length === 0) return {
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    latestScore: 0,
  };

  const scores = attempts.map(a => a.score);
  return {
    totalAttempts: attempts.length,
    averageScore: Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10,
    bestScore: Math.max(...scores),
    latestScore: attempts[attempts.length - 1]?.score || 0,
  };
};

const getDateKey = (date, timeframe) => {
  const d = new Date(date);
  switch (timeframe) {
    case "weekly":
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
    case "monthly":
      const weekNum = Math.ceil(d.getDate() / 7);
      return `Week ${weekNum}`;
    case "yearly":
      return [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ][d.getMonth()];
    default:
      return d.toISOString().split("T")[0];
  }
};

module.exports = {
  calculateCourseProgress,
  calculateQuizStats,
  getDateKey,
};
