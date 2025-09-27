const { PrismaClient } = require("../../generated/prisma");
const { getDateKey } = require("../utils/progressCalculations");
const prisma = new PrismaClient();

class ActivityAnalyticsService {

  calculateIntervalWatchTime(log, startDate, endDate) {
    const intervals = log.pauseEvents;
    if (!Array.isArray(intervals)) return 0;

    let totalTime = 0;
    const start = startDate.getTime();
    const end = endDate.getTime();

    intervals.forEach(interval => {
      if (!Array.isArray(interval) || interval.length === 0) return;

      const [playTime, rawPauseTime] = interval;
      // If the interval is open (e.g., [playTime, null]), use the log's updatedAt as the end time.
      const pauseTime = rawPauseTime === null ? new Date(log.updatedAt).getTime() : rawPauseTime;

      if (!playTime || !pauseTime) return; // Skip invalid intervals

      const overlapStart = Math.max(playTime, start);
      const overlapEnd = Math.min(pauseTime, end);

      if (overlapStart < overlapEnd) {
        totalTime += (overlapEnd - overlapStart) / 1000; // Convert to seconds
      }
    });

    return totalTime;
  }

  async getActivityTrends(userId, timeframe = "weekly") {
    try {
      const startDate = this.getStartDate(timeframe);
      const watchLogs = await prisma.watchLog.findMany({
        where: { userId, updatedAt: { gte: startDate } },
        select: { updatedAt: true, isCompleted: true, pauseEvents: true },
      });

      return this.formatTrendsData(watchLogs, timeframe);
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
        select: { updatedAt: true, isCompleted: true, pauseEvents: true },
      });

      const activityMap = new Map();
      watchLogs.forEach((log) => {
        const logDate = new Date(log.updatedAt);
        const dateStr = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}-${String(logDate.getDate()).padStart(2, '0')}`;
        
        const dayStart = new Date(dateStr);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(dateStr);
        dayEnd.setHours(23, 59, 59, 999);

        if (!activityMap.has(dateStr)) {
          activityMap.set(dateStr, { date: dateStr, studyTime: 0, lessons: 0, intensity: 0 });
        }
        const activity = activityMap.get(dateStr);

        const intervalTime = this.calculateIntervalWatchTime(log, dayStart, dayEnd);
        activity.studyTime += intervalTime / 3600; // Convert to hours

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
      activities.forEach(activity => {
        const dayOfWeek = (new Date(activity.date).getUTCDay() + 6) % 7; // Use UTC day for consistency
        activityByDayOfWeek[dayOfWeek] += activity.studyTime;
      });

      return {
        calendarData: activities,
        summary: {
          totalActiveDays,
          totalStudyTimeYear: Math.round(totalStudyTimeYear * 10) / 10,
          totalLessonsYear,
          activityByDayOfWeek: activityByDayOfWeek.map(time => Math.round(time * 100) / 100),
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
        select: { updatedAt: true, pauseEvents: true },
      });

      const dataMap = new Map();
      watchData.forEach((log) => {
        const dateKey = getDateKey(log.updatedAt, timeframe);
        if (!dataMap.has(dateKey)) {
          dataMap.set(dateKey, { period: dateKey, studyTime: 0, date: log.updatedAt });
        }
        const intervalTime = this.calculateIntervalWatchTime(log, this.getStartDate('yearly'), new Date()); // Wide range to capture all time
        dataMap.get(dateKey).studyTime += intervalTime / 3600; // to hours
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
      const result = await prisma.$queryRaw`
            SELECT DATE(updatedAt) as date, COUNT(*) as lessons
            FROM WatchLog
            WHERE userId = ${userId} AND isCompleted = true AND updatedAt >= ${startDate}
            GROUP BY DATE(updatedAt)
            ORDER BY date ASC
        `;

      const dataMap = new Map();
      result.forEach((row) => {
        const dateKey = getDateKey(new Date(row.date), timeframe);
        if (!dataMap.has(dateKey)) {
          dataMap.set(dateKey, { period: dateKey, lessons: 0, date: new Date(row.date) });
        }
        dataMap.get(dateKey).lessons += Number(row.lessons); // Convert BigInt to Number
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

  formatTrendsData(watchLogs, timeframe) {
    const dataMap = new Map();
    watchLogs.forEach((log) => {
      const dateKey = getDateKey(log.updatedAt, timeframe);
      if (!dataMap.has(dateKey)) {
        dataMap.set(dateKey, { period: dateKey, studyTime: 0, lessons: 0, date: log.updatedAt });
      }
      const data = dataMap.get(dateKey);

      const logDate = new Date(log.updatedAt);
      const dayStart = new Date(logDate);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(logDate);
      dayEnd.setHours(23, 59, 59, 999);

      const intervalTime = this.calculateIntervalWatchTime(log, dayStart, dayEnd);
      data.studyTime += intervalTime / 3600; // Convert the day's seconds to hours

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
        select: { updatedAt: true, pauseEvents: true },
      });

      // Group by hour of day
      const hourlyActivity = new Array(24).fill(0);

      watchLogs.forEach(log => {
        const intervals = log.pauseEvents;
        if (!Array.isArray(intervals)) return;
        
        intervals.forEach(interval => {
            if (!Array.isArray(interval) || interval.length < 2 || !interval[0] || !interval[1]) return;
            const [playTime, pauseTime] = interval.map(t => new Date(t));
            
            // Distribute the interval's duration across the hours it spans
            for (let hour = 0; hour < 24; hour++) {
                const hourStart = new Date(playTime).setHours(hour, 0, 0, 0);
                const hourEnd = new Date(playTime).setHours(hour, 59, 59, 999);

                const overlapStart = Math.max(playTime.getTime(), hourStart);
                const overlapEnd = Math.min(pauseTime.getTime(), hourEnd);

                if (overlapStart < overlapEnd) {
                    hourlyActivity[hour] += (overlapEnd - overlapStart) / 1000 / 3600; // Add hours
                }
            }
        });
      });

      if (hourlyActivity.every(h => h === 0)) return "No data";

      // Find peak hours (hours with most activity)
      const maxActivity = Math.max(...hourlyActivity);
       const peakHours = hourlyActivity
          .map((activity, hour) => ({ hour, activity }))
          .filter(h => h.activity > maxActivity * 0.75) // within 75% of peak
          .map(h => h.hour);

      // Format peak hours range
      if (peakHours.length === 0) return "No data";
      if (peakHours.length === 1) return `${peakHours[0]}:00 - ${peakHours[0]+1}:00`;

      const startHour = peakHours[0];
      const endHour = peakHours[peakHours.length - 1];
      return `${startHour}:00 - ${endHour + 1}:00`;

    } catch (error) {
      console.error("Error getting peak study hours:", error);
      return "N/A";
    }
  }

}

module.exports = new ActivityAnalyticsService();
