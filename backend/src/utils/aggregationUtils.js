// --- Course Completion Aggregations ---

function aggregateByGrade(studentsWithProgress) {
  const gradeMap = new Map();
  
  studentsWithProgress.forEach(student => {
    const gradeValue = student.grade?.value || 'No Grade';
    if (!gradeMap.has(gradeValue)) {
      gradeMap.set(gradeValue, { students: [] });
    }
    gradeMap.get(gradeValue).students.push(student);
  });

  return Array.from(gradeMap.entries()).map(([grade, data]) => {
    const studentCount = data.students.length;
    const totalEnrollments = data.students.reduce((sum, s) => sum + s.courseProgress.length, 0);
    
    const completedCourses = data.students.reduce((sum, s) => {
      return sum + s.courseProgress.filter(cp => cp.isCompleted).length;
    }, 0);

    const avgCompletionRate = studentCount > 0
      ? data.students.reduce((sum, s) => {
          const studentAvg = s.courseProgress.length > 0
            ? s.courseProgress.reduce((cSum, cp) => cSum + cp.completionRate, 0) / s.courseProgress.length
            : 0;
          return sum + studentAvg;
        }, 0) / studentCount
      : 0;

    return {
      grade,
      studentCount,
      avgCompletionRate: Math.round(avgCompletionRate),
      completedCourses,
      totalEnrollments
    };
  });
}

function aggregateBySchool(studentsWithProgress) {
    const schoolMap = new Map();

    studentsWithProgress.forEach(student => {
        const schoolName = student.school?.name || 'No School';
        if (!schoolMap.has(schoolName)) {
            schoolMap.set(schoolName, { students: [] });
        }
        schoolMap.get(schoolName).students.push(student);
    });

    return Array.from(schoolMap.entries()).map(([school, data]) => {
        const studentCount = data.students.length;
        const totalEnrollments = data.students.reduce((sum, s) => sum + s.courseProgress.length, 0);
        const completedCourses = data.students.reduce((sum, s) => sum + s.courseProgress.filter(cp => cp.isCompleted).length, 0);

        const avgCompletionRate = studentCount > 0
            ? data.students.reduce((sum, s) => {
                const studentAvg = s.courseProgress.length > 0
                    ? s.courseProgress.reduce((cSum, cp) => cSum + cp.completionRate, 0) / s.courseProgress.length
                    : 0;
                return sum + studentAvg;
            }, 0) / studentCount
            : 0;

        return {
            school,
            studentCount,
            avgCompletionRate: Math.round(avgCompletionRate),
            completedCourses,
            totalEnrollments
        };
    });
}


function aggregateByDistrict(studentsWithProgress) {
    const districtMap = new Map();

    studentsWithProgress.forEach(student => {
        const districtName = student.school?.district?.name || 'No District';
        if (!districtMap.has(districtName)) {
            districtMap.set(districtName, { students: [] });
        }
        districtMap.get(districtName).students.push(student);
    });

    return Array.from(districtMap.entries()).map(([district, data]) => {
        const studentCount = data.students.length;
        const totalEnrollments = data.students.reduce((sum, s) => sum + s.courseProgress.length, 0);
        const completedCourses = data.students.reduce((sum, s) => sum + s.courseProgress.filter(cp => cp.isCompleted).length, 0);

        const avgCompletionRate = studentCount > 0
            ? data.students.reduce((sum, s) => {
                const studentAvg = s.courseProgress.length > 0
                    ? s.courseProgress.reduce((cSum, cp) => cSum + cp.completionRate, 0) / s.courseProgress.length
                    : 0;
                return sum + studentAvg;
            }, 0) / studentCount
            : 0;

        return {
            district,
            studentCount,
            avgCompletionRate: Math.round(avgCompletionRate),
            completedCourses,
            totalEnrollments
        };
    });
}


function calculateOverallCompletionRates(studentsWithProgress) {
  const totalStudents = studentsWithProgress.length;
  const totalEnrollments = studentsWithProgress.reduce((sum, student) => sum + student.courseProgress.length, 0);
  
  const completedCourses = studentsWithProgress.reduce((sum, student) => {
    return sum + student.courseProgress.filter(cp => cp.isCompleted).length;
  }, 0);

  const avgCompletionRate = totalStudents > 0
    ? studentsWithProgress.reduce((sum, s) => {
        const studentAvg = s.courseProgress.length > 0
          ? s.courseProgress.reduce((cSum, cp) => cSum + cp.completionRate, 0) / s.courseProgress.length
          : 0;
        return sum + studentAvg;
      }, 0) / totalStudents
    : 0;

  return {
    totalStudents,
    totalEnrollments,
    avgCompletionRate: Math.round(avgCompletionRate),
    completedCourses,
    completionPercentage: totalEnrollments > 0 ? Math.round((completedCourses / totalEnrollments) * 100) : 0
  };
}

// --- Quiz Score Aggregations ---

function aggregateQuizScoresByGrade(quizAttempts) {
  const gradeMap = new Map();
  
  quizAttempts.forEach(attempt => {
    const grade = attempt.user.grade?.value || 'No Grade';
    if (!gradeMap.has(grade)) {
      gradeMap.set(grade, []);
    }
    gradeMap.get(grade).push(attempt.score);
  });

  return Array.from(gradeMap.entries()).map(([grade, scores]) => ({
    grade,
    avgScore: scores.length > 0 ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10 : 0,
    attemptCount: scores.length,
    perfectScores: scores.filter(score => score >= 95).length
  }));
}

function aggregateQuizScoresBySchool(quizAttempts) {
  const schoolMap = new Map();
  
  quizAttempts.forEach(attempt => {
    const school = attempt.user.school?.name || 'No School';
    if (!schoolMap.has(school)) {
      schoolMap.set(school, []);
    }
    schoolMap.get(school).push(attempt.score);
  });

  return Array.from(schoolMap.entries()).map(([school, scores]) => ({
    school,
    avgScore: scores.length > 0 ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10 : 0,
    attemptCount: scores.length,
    perfectScores: scores.filter(score => score >= 95).length
  }));
}

function aggregateQuizScoresByDistrict(quizAttempts) {
  const districtMap = new Map();
  
  quizAttempts.forEach(attempt => {
    const district = attempt.user.school?.district?.name || 'No District';
    if (!districtMap.has(district)) {
      districtMap.set(district, []);
    }
    districtMap.get(district).push(attempt.score);
  });

  return Array.from(districtMap.entries()).map(([district, scores]) => ({
    district,
    avgScore: scores.length > 0 ? Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10 : 0,
    attemptCount: scores.length,
    perfectScores: scores.filter(score => score >= 95).length
  }));
}

function aggregateQuizScoresByCourse(quizAttempts) {
  const courseMap = new Map();
  
  quizAttempts.forEach(attempt => {
    const course = attempt.quiz.video.courseVideos?.[0]?.course;
    const courseTitle = course?.title || 'Unknown Course';
    const courseId = course?.id || 0;
    
    if (!courseMap.has(courseId)) {
      courseMap.set(courseId, { title: courseTitle, scores: [] });
    }
    courseMap.get(courseId).scores.push(attempt.score);
  });

  return Array.from(courseMap.entries()).map(([courseId, data]) => ({
    courseId,
    courseTitle: data.title,
    avgScore: data.scores.length > 0 ? Math.round((data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length) * 10) / 10 : 0,
    attemptCount: data.scores.length,
    perfectScores: data.scores.filter(score => score >= 95).length
  }));
}

function aggregateQuizScoresByVideo(quizAttempts) {
  const videoMap = new Map();
  
  quizAttempts.forEach(attempt => {
    const videoId = attempt.quiz.videoId;
    const videoTitle = attempt.quiz.video.title;
    
    if (!videoMap.has(videoId)) {
      videoMap.set(videoId, { title: videoTitle, scores: [] });
    }
    videoMap.get(videoId).scores.push(attempt.score);
  });

  return Array.from(videoMap.entries()).map(([videoId, data]) => ({
    videoId,
    videoTitle: data.title,
    avgScore: data.scores.length > 0 ? Math.round((data.scores.reduce((sum, score) => sum + score, 0) / data.scores.length) * 10) / 10 : 0,
    attemptCount: data.scores.length,
    perfectScores: data.scores.filter(score => score >= 95).length
  }));
}

function calculateOverallQuizScores(quizAttempts) {
  const totalAttempts = quizAttempts.length;
  const avgScore = totalAttempts > 0 
    ? Math.round((quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts) * 10) / 10 
    : 0;
  const perfectScores = quizAttempts.filter(attempt => attempt.score >= 95).length;
  const uniqueStudents = new Set(quizAttempts.map(attempt => attempt.userId)).size;
  const uniqueQuizzes = new Set(quizAttempts.map(attempt => attempt.quizId)).size;

  return {
    totalAttempts,
    avgScore,
    perfectScores,
    uniqueStudents,
    uniqueQuizzes,
    perfectScoreRate: totalAttempts > 0 ? Math.round((perfectScores / totalAttempts) * 100) : 0
  };
}


// --- Consistency Aggregations ---

function aggregateConsistencyByGrade(consistencyData) {
  const gradeMap = new Map();
  
  consistencyData.forEach(data => {
    const grade = data.grade || 'No Grade';
    if (!gradeMap.has(grade)) {
      gradeMap.set(grade, []);
    }
    gradeMap.get(grade).push(data.consistencyRate);
  });

  return Array.from(gradeMap.entries()).map(([grade, rates]) => ({
    grade,
    avgConsistencyRate: rates.length > 0 ? Math.round(rates.reduce((sum, rate) => sum + rate, 0) / rates.length) : 0,
    studentCount: rates.length,
    highConsistencyStudents: rates.filter(rate => rate >= 70).length
  }));
}

function aggregateConsistencyBySchool(consistencyData) {
  const schoolMap = new Map();
  
  consistencyData.forEach(data => {
    const school = data.school || 'No School';
    if (!schoolMap.has(school)) {
      schoolMap.set(school, []);
    }
    schoolMap.get(school).push(data.consistencyRate);
  });

  return Array.from(schoolMap.entries()).map(([school, rates]) => ({
    school,
    avgConsistencyRate: rates.length > 0 ? Math.round(rates.reduce((sum, rate) => sum + rate, 0) / rates.length) : 0,
    studentCount: rates.length,
    highConsistencyStudents: rates.filter(rate => rate >= 70).length
  }));
}

function aggregateConsistencyByDistrict(consistencyData) {
  const districtMap = new Map();
  
  consistencyData.forEach(data => {
    const district = data.district || 'No District';
    if (!districtMap.has(district)) {
      districtMap.set(district, []);
    }
    districtMap.get(district).push(data.consistencyRate);
  });

  return Array.from(districtMap.entries()).map(([district, rates]) => ({
    district,
    avgConsistencyRate: rates.length > 0 ? Math.round(rates.reduce((sum, rate) => sum + rate, 0) / rates.length) : 0,
    studentCount: rates.length,
    highConsistencyStudents: rates.filter(rate => rate >= 70).length
  }));
}

function calculateOverallConsistency(consistencyData) {
  const totalStudents = consistencyData.length;
  const avgConsistencyRate = totalStudents > 0 
    ? Math.round(consistencyData.reduce((sum, data) => sum + data.consistencyRate, 0) / totalStudents)
    : 0;
  const highConsistencyStudents = consistencyData.filter(data => data.consistencyRate >= 70).length;

  return {
    totalStudents,
    avgConsistencyRate,
    highConsistencyStudents,
    highConsistencyPercentage: totalStudents > 0 ? Math.round((highConsistencyStudents / totalStudents) * 100) : 0
  };
}


module.exports = {
  aggregateByGrade,
  aggregateBySchool,
  aggregateByDistrict,
  calculateOverallCompletionRates,
  aggregateQuizScoresByGrade,
  aggregateQuizScoresBySchool,
  aggregateQuizScoresByDistrict,
  aggregateQuizScoresByCourse,
  aggregateQuizScoresByVideo,
  calculateOverallQuizScores,
  aggregateConsistencyByGrade,
  aggregateConsistencyBySchool,
  aggregateConsistencyByDistrict,
  calculateOverallConsistency,
};
