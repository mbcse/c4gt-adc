const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

function buildUserFilter(filters = {}) {
  const where = { role: 'STUDENT' };
  
  if (filters.gradeId) where.gradeId = parseInt(filters.gradeId);
  if (filters.schoolId) where.schoolId = parseInt(filters.schoolId);
  if (filters.districtId) where.districtId = parseInt(filters.districtId);
  if (filters.studentId) where.id = parseInt(filters.studentId);
  
  return where;
}

function buildDateFilter(filters = {}) {
  const dateFilter = {};
  if (filters.startDate) dateFilter.gte = new Date(filters.startDate);
  if (filters.endDate) dateFilter.lte = new Date(filters.endDate);
  return Object.keys(dateFilter).length > 0 ? dateFilter : undefined;
}

async function getEnrolledCoursesForStudents(studentIds, dateFilter) {
  // Get assigned courses
  const assignedCourses = await prisma.courseAssignment.findMany({
    where: { userId: { in: studentIds } },
    select: { userId: true, courseId: true, course: { select: { id: true, title: true } } }
  });

  // Get started courses (courses where students have watch logs)
  const startedCourses = await prisma.watchLog.findMany({
    where: {
      userId: { in: studentIds },
      ...(dateFilter && { updatedAt: dateFilter })
    },
    include: {
      video: {
        include: {
          courseVideos: {
            include: { course: { select: { id: true, title: true } } }
          }
        }
      }
    }
  });

  const enrollmentMap = new Map();
  
  assignedCourses.forEach(assignment => {
    if (!enrollmentMap.has(assignment.userId)) {
      enrollmentMap.set(assignment.userId, new Map());
    }
    enrollmentMap.get(assignment.userId).set(assignment.courseId, {
      courseId: assignment.courseId,
      courseTitle: assignment.course.title,
      isAssigned: true,
      isStarted: false
    });
  });

  startedCourses.forEach(log => {
    log.video.courseVideos.forEach(cv => {
      if (!enrollmentMap.has(log.userId)) {
        enrollmentMap.set(log.userId, new Map());
      }
      
      const userCourses = enrollmentMap.get(log.userId);
      if (!userCourses.has(cv.courseId)) {
        userCourses.set(cv.courseId, {
          courseId: cv.courseId,
          courseTitle: cv.course.title,
          isAssigned: false,
          isStarted: true
        });
      } else {
        const courseInfo = userCourses.get(cv.courseId);
        courseInfo.isStarted = true;
      }
    });
  });

  return enrollmentMap;
}

module.exports = {
  buildUserFilter,
  buildDateFilter,
  getEnrolledCoursesForStudents,
};
