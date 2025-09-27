/*
  Warnings:

  - A unique constraint covering the columns `[userId,videoId]` on the table `WatchLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `WatchLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchLog" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "isCompleted" SET DEFAULT false,
ALTER COLUMN "watchedPercentage" SET DEFAULT 0.0,
ALTER COLUMN "skipEvents" SET DEFAULT '[]',
ALTER COLUMN "pauseEvents" SET DEFAULT '[]',
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "WatchLog_userId_idx" ON "WatchLog"("userId");

-- CreateIndex
CREATE INDEX "WatchLog_videoId_idx" ON "WatchLog"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchLog_userId_videoId_key" ON "WatchLog"("userId", "videoId");
