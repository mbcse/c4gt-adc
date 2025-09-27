const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const getOrgUnitDescendants = async (orgUnitId) => {
  if (!orgUnitId) return [];
  const children = await prisma.organizationUnit.findMany({
    where: { parentId: orgUnitId },
    select: { id: true },
  });

  const descendantIds = children.map(c => c.id);
  
  for (const childId of descendantIds) {
    const grandchildrenIds = await getOrgUnitDescendants(childId);
    descendantIds.push(...grandchildrenIds);
  }
  
  return descendantIds;
};

const buildUserFilter = async (filters = {}, user) => {
  const filterConditions = { role: "STUDENT" };

  // Data Scoping
  if (user && user.role !== 'SUPERADMIN' && user.organizationUnitId) {
    const descendantIds = await getOrgUnitDescendants(user.organizationUnitId);
    const accessibleOrgUnitIds = [user.organizationUnitId, ...descendantIds];
    filterConditions.organizationUnitId = { in: accessibleOrgUnitIds };
  }

  // Apply user-selected filters on top of the security scope.
  if (filters.schoolId) {
    const schoolId = parseInt(filters.schoolId, 10);
    if (filterConditions.organizationUnitId?.in) {
      if (filterConditions.organizationUnitId.in.includes(schoolId)) {
        filterConditions.organizationUnitId.in = [schoolId];
      } else {
        // schoolId not in user's accessible org units disables access
        filterConditions.organizationUnitId.in = [];
      }
    } else {
      filterConditions.organizationUnitId = { in: [schoolId] };
    }
  } else if (filters.blockId) {
    const blockId = parseInt(filters.blockId, 10);
    const descendantSchoolIds = await getOrgUnitDescendants(blockId);
    const blockAndSchoolIds = [blockId, ...descendantSchoolIds];

    if (filterConditions.organizationUnitId?.in) {
      filterConditions.organizationUnitId.in = filterConditions.organizationUnitId.in.filter(id => blockAndSchoolIds.includes(id));
    } else {
      filterConditions.organizationUnitId = { in: blockAndSchoolIds };
    }
  }

  if (filters.gradeId) {
    filterConditions.gradeId = parseInt(filters.gradeId, 10);
  }

  if (filters.studentId) {
    filterConditions.id = parseInt(filters.studentId, 10);
  }

  return filterConditions;
};

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
  getOrgUnitDescendants,
};
