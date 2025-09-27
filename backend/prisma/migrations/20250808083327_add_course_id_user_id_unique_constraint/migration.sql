/*
  Warnings:

  - A unique constraint covering the columns `[courseId,userId]` on the table `CourseAssignment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CourseAssignment_userId_courseId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "CourseAssignment_courseId_userId_key" ON "CourseAssignment"("courseId", "userId");
