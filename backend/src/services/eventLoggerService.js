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
        const now = Date.now();
        const lastUpdate = await prisma.watchLog.findUnique({
          where: { userId_videoId: { userId, videoId } },
          select: { lastUpdateTime: true, totalWatchTime: true }
        });

        if (lastUpdate?.lastUpdateTime) {
          const timeDiff = (now - lastUpdate.lastUpdateTime.getTime()) / 1000;
          const watchTimeDiff = (data.totalWatchTime || 0) - (lastUpdate.totalWatchTime || 0);

          if (timeDiff > 2 && watchTimeDiff > timeDiff * 1.6) {
            console.warn(`Gaming detected in EventLogger: userId=${userId}, watchTimeDiff=${watchTimeDiff}, realTimeDiff=${timeDiff}`);
            return; 
          }
        }

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

