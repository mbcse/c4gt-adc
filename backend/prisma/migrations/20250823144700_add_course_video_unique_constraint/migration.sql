/*
  Warnings:

  - A unique constraint covering the columns `[courseId,videoId]` on the table `CourseVideo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseVideo_courseId_videoId_key" ON "CourseVideo"("courseId", "videoId");
