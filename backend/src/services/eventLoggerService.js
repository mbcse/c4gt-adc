const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

class EventLoggerService {

  async logEvent(userId, videoId, eventType, data, userAgent) {
    try {
      const updateData = {
        lastEventType: eventType,
        lastUpdateTime: new Date(),
        lastUserAgent: userAgent,
      };

      if (eventType === "PROGRESS_UPDATE" && data) {
        updateData.totalWatchTime = data.totalWatchTime;
        updateData.watchedPercentage = data.watchedPercentage;
        updateData.isCompleted = data.isCompleted;
        updateData.skipEvents = data.skipEvents;
        updateData.pauseEvents = data.pauseEvents;
      }

      await prisma.watchLog.upsert({
        where: { userId_videoId: { userId, videoId } },
        create: {
          userId,
          videoId,
          totalWatchTime: data?.totalWatchTime || 0,
          watchedPercentage: data?.watchedPercentage || 0,
          isCompleted: data?.isCompleted || false,
          ...updateData,
        },
        update: updateData,
      });
    } catch (error) {
      console.error(`Error logging event:`, error);
      throw error;
    }
  }
}

module.exports = new EventLoggerService();

