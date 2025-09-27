-- DropIndex
DROP INDEX "WatchLog_userId_idx";

-- DropIndex
DROP INDEX "WatchLog_videoId_idx";

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "generatedBy" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "CourseAssignment_userId_courseId_idx" ON "CourseAssignment"("userId", "courseId");

-- CreateIndex
CREATE INDEX "CourseVideo_courseId_order_idx" ON "CourseVideo"("courseId", "order");

-- CreateIndex
CREATE INDEX "WatchLog_userId_updatedAt_idx" ON "WatchLog"("userId", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "WatchLog_videoId_isCompleted_idx" ON "WatchLog"("videoId", "isCompleted");
