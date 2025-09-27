-- DropIndex
DROP INDEX "AnalyticsEvent_userId_timestamp_idx";

-- DropIndex
DROP INDEX "AnalyticsEvent_videoId_eventType_idx";

-- CreateIndex
CREATE INDEX "AnalyticsEvent_videoId_eventType_timestamp_idx" ON "AnalyticsEvent"("videoId", "eventType", "timestamp" DESC);

-- CreateIndex
CREATE INDEX "AnalyticsEvent_userId_eventType_timestamp_idx" ON "AnalyticsEvent"("userId", "eventType", "timestamp" DESC);

-- CreateIndex
CREATE INDEX "WatchLog_userId_videoId_idx" ON "WatchLog"("userId", "videoId");

-- CreateIndex
CREATE INDEX "WatchLog_lastUpdateTime_idx" ON "WatchLog"("lastUpdateTime");
