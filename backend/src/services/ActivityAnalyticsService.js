const { PrismaClient } = require("../../generated/prisma");
const { getDateKey } = require("../utils/progressCalculations");
const prisma = new PrismaClient();

class ActivityAnalyticsService {
  async getActivityTrends(userId, timeframe = "weekly") {
    try {
      const startDate = this.getStartDate(timeframe);
      const watchData = await prisma.watchLog.findMany({
        where: { userId, updatedAt: { gte: startDate } },
        select: { totalWatchTime: true, updatedAt: true, isCompleted: true },
      });

      return this.formatTrendsData(watchData, timeframe);
    } catch (error) {
      console.error("Error getting activity trends:", error);
      throw error;
    }
  }

  async getActivityCalendar(userId, year = new Date().getFullYear()) {
    try {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);

      const watchLogs = await prisma.watchLog.findMany({
        where: { userId, updatedAt: { gte: startDate, lte: endDate } },
        select: {
          totalWatchTime: true,
          updatedAt: true,
          isCompleted: true,
          pauseEvents: true
        },
      });

      const activityMap = new Map();
      watchLogs.forEach((log) => {
        const dateStr = log.updatedAt.toISOString().split('T')[0];
        const dayStart = new Date(dateStr + 'T00:00:00.000Z');
        const dayEnd = new Date(dateStr + 'T23:59:59.999Z');

        if (!activityMap.has(dateStr)) {
          activityMap.set(dateStr, { date: dateStr, studyTime: 0, lessons: 0, intensity: 0 });
        }
        const activity = activityMap.get(dateStr);

        if (log.pauseEvents && Array.isArray(log.pauseEvents)) {
          const intervalTime = this.calculateIntervalWatchTime(log.pauseEvents, dayStart, dayEnd);
          activity.studyTime += intervalTime / 3600; // Convert to hours
        } else {
          activity.studyTime += log.totalWatchTime / 3600;
        }

        if (log.isCompleted) activity.lessons++;
      });

      const activities = Array.from(activityMap.values());
      const maxStudyTime = Math.max(...activities.map(a => a.studyTime), 1);

      activities.forEach(activity => {
        if (activity.studyTime === 0) activity.intensity = 0;
        else if (activity.studyTime <= maxStudyTime * 0.25) activity.intensity = 1;
        else if (activity.studyTime <= maxStudyTime * 0.5) activity.intensity = 2;
        else if (activity.studyTime <= maxStudyTime * 0.75) activity.intensity = 3;
        else activity.intensity = 4;
      });

      const totalActiveDays = activities.filter(a => a.intensity > 0).length;
      const totalStudyTimeYear = activities.reduce((sum, a) => sum + a.studyTime, 0);
      const totalLessonsYear = activities.reduce((sum, a) => sum + a.lessons, 0);

      // Calculate activity by day of the week (Mon=0, Sun=6)
      const activityByDayOfWeek = new Array(7).fill(0);
      watchLogs.forEach(log => {
        const dayOfWeek = (log.updatedAt.getDay() + 6) % 7;

        if (log.pauseEvents && Array.isArray(log.pauseEvents)) {
          const dayStart = new Date(log.updatedAt);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(log.updatedAt);
          dayEnd.setHours(23, 59, 59, 999);

          const intervalTime = this.calculateIntervalWatchTime(log.pauseEvents, dayStart, dayEnd);
          activityByDayOfWeek[dayOfWeek] += intervalTime;
        } else {
          activityByDayOfWeek[dayOfWeek] += log.totalWatchTime;
        }
      });

      return {
        calendarData: activities,
        summary: {
          totalActiveDays,
          totalStudyTimeYear: Math.round(totalStudyTimeYear * 10) / 10,
          totalLessonsYear,
          activityByDayOfWeek: activityByDayOfWeek.map(time => Math.round((time / 3600) * 100) / 100),
        }
      };

    } catch (error) {
      console.error("Error getting activity calendar:", error);
      throw error;
    }
  }

  async getStudyTimePatterns(userId, timeframe = "weekly") {
    try {
      const startDate = this.getStartDate(timeframe);
      const watchData = await prisma.watchLog.findMany({
        where: { userId, updatedAt: { gte: startDate } },
        select: { totalWatchTime: true, updatedAt: true },
      });

      const dataMap = new Map();
      watchData.forEach((log) => {
        const dateKey = getDateKey(log.updatedAt, timeframe);
        if (!dataMap.has(dateKey)) {
          dataMap.set(dateKey, { period: dateKey, studyTime: 0, date: log.updatedAt });
        }
        dataMap.get(dateKey).studyTime += log.totalWatchTime / 3600;
      });

      return Array.from(dataMap.values())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) => ({ period: item.period, studyTime: Math.round(item.studyTime * 100) / 100 }));
    } catch (error) {
      console.error("Error getting study time patterns:", error);
      throw error;
    }
  }

  async getLessonCompletionPatterns(userId, timeframe = "weekly") {
    try {
      const startDate = this.getStartDate(timeframe);
      const watchData = await prisma.watchLog.findMany({
        where: { userId, updatedAt: { gte: startDate }, isCompleted: true },
        select: { updatedAt: true },
      });

      const dataMap = new Map();
      watchData.forEach((log) => {
        const dateKey = getDateKey(log.updatedAt, timeframe);
        if (!dataMap.has(dateKey)) {
          dataMap.set(dateKey, { period: dateKey, lessons: 0, date: log.updatedAt });
        }
        dataMap.get(dateKey).lessons++;
      });

      return Array.from(dataMap.values())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((item) => ({ period: item.period, lessons: item.lessons }));
    } catch (error) {
      console.error("Error getting lesson completion patterns:", error);
      throw error;
    }
  }

  getStartDate(timeframe) {
    const now = new Date();
    switch (timeframe) {
      case "weekly": return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case "monthly": return new Date(now.getFullYear(), now.getMonth() - 3, 1);
      case "yearly": return new Date(now.getFullYear() - 1, 0, 1);
      default: return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  }

  formatTrendsData(watchData, timeframe) {
    const dataMap = new Map();
    watchData.forEach((log) => {
      const dateKey = getDateKey(log.updatedAt, timeframe);
      if (!dataMap.has(dateKey)) {
        dataMap.set(dateKey, { period: dateKey, studyTime: 0, lessons: 0, date: log.updatedAt });
      }
      const data = dataMap.get(dateKey);
      data.studyTime += log.totalWatchTime / 3600;
      if (log.isCompleted) data.lessons++;
    });

    return Array.from(dataMap.values())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((item) => ({
        period: item.period,
        studyTime: Math.round(item.studyTime * 100) / 100,
        lessons: item.lessons,
      }));
  }

  async getPeakStudyHours(userId) {
    try {
      const watchLogs = await prisma.watchLog.findMany({
        where: { userId },
        select: { updatedAt: true, totalWatchTime: true },
      });

      // Group by hour of day
      const hourlyActivity = new Array(24).fill(0);

      watchLogs.forEach(log => {
        const hour = log.updatedAt.getHours();
        hourlyActivity[hour] += log.totalWatchTime / 3600;
      });

      // Find peak hours (hours with most activity)
      const maxActivity = Math.max(...hourlyActivity);
      const peakHours = [];

      hourlyActivity.forEach((activity, hour) => {
        if (activity > maxActivity * 0.8) { // Within 80% of peak activity
          peakHours.push(hour);
        }
      });

      // Format peak hours range
      if (peakHours.length === 0) return "No data";
      if (peakHours.length === 1) return `${peakHours[0]}:00`;

      const sortedHours = peakHours.sort((a, b) => a - b);
      const startHour = sortedHours[0];
      const endHour = sortedHours[sortedHours.length - 1];

      return `${startHour}:00-${endHour + 1}:00`;
    } catch (error) {
      console.error("Error getting peak study hours:", error);
      return "N/A";
    }
  }

  // Helper function to calculate total watch time from intervals
  calculateIntervalWatchTime(intervals, startDate, endDate) {
    if (!Array.isArray(intervals)) return 0;

    let totalTime = 0;
    const start = startDate.getTime();
    const end = endDate.getTime();

    intervals.forEach(interval => {
      if (!Array.isArray(interval) || interval.length < 2) return;

      const [playTime, pauseTime] = interval;
      if (!playTime || !pauseTime) return; // Skip incomplete intervals

      // Calculate overlap with the date range
      const overlapStart = Math.max(playTime, start);
      const overlapEnd = Math.min(pauseTime, end);

      if (overlapStart < overlapEnd) {
        totalTime += (overlapEnd - overlapStart) / 1000; // Convert to seconds
      }
    });

    return totalTime;
  }


}

module.exports = new ActivityAnalyticsService();
