/*
  Warnings:

  - You are about to drop the column `districtId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dailyProgress` on the `WatchLog` table. All the data in the column will be lost.
  - You are about to drop the `AnalyticsEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('STATE', 'DISTRICT', 'BLOCK', 'SCHOOL');

-- DropForeignKey
ALTER TABLE "AnalyticsEvent" DROP CONSTRAINT "AnalyticsEvent_userId_fkey";

-- DropForeignKey
ALTER TABLE "AnalyticsEvent" DROP CONSTRAINT "AnalyticsEvent_videoId_fkey";

-- DropForeignKey
ALTER TABLE "School" DROP CONSTRAINT "School_districtId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_districtId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_schoolId_fkey";

-- DropIndex
DROP INDEX "User_districtId_idx";

-- DropIndex
DROP INDEX "User_schoolId_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "districtId",
DROP COLUMN "schoolId",
ADD COLUMN     "organizationUnitId" INTEGER;

-- AlterTable
ALTER TABLE "WatchLog" DROP COLUMN "dailyProgress";

-- DropTable
DROP TABLE "AnalyticsEvent";

-- DropTable
DROP TABLE "District";

-- DropTable
DROP TABLE "School";

-- CreateTable
CREATE TABLE "OrganizationUnit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "UnitType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" INTEGER,

    CONSTRAINT "OrganizationUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationAssignment" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "organizationUnitId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedById" INTEGER,

    CONSTRAINT "OrganizationAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GradeToOrganizationUnit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GradeToOrganizationUnit_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "OrganizationUnit_parentId_idx" ON "OrganizationUnit"("parentId");

-- CreateIndex
CREATE INDEX "OrganizationUnit_type_idx" ON "OrganizationUnit"("type");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationAssignment_courseId_organizationUnitId_key" ON "OrganizationAssignment"("courseId", "organizationUnitId");

-- CreateIndex
CREATE INDEX "_GradeToOrganizationUnit_B_index" ON "_GradeToOrganizationUnit"("B");

-- CreateIndex
CREATE INDEX "User_organizationUnitId_idx" ON "User"("organizationUnitId");

-- AddForeignKey
ALTER TABLE "OrganizationUnit" ADD CONSTRAINT "OrganizationUnit_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "OrganizationUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationUnitId_fkey" FOREIGN KEY ("organizationUnitId") REFERENCES "OrganizationUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAssignment" ADD CONSTRAINT "OrganizationAssignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationAssignment" ADD CONSTRAINT "OrganizationAssignment_organizationUnitId_fkey" FOREIGN KEY ("organizationUnitId") REFERENCES "OrganizationUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeToOrganizationUnit" ADD CONSTRAINT "_GradeToOrganizationUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeToOrganizationUnit" ADD CONSTRAINT "_GradeToOrganizationUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "OrganizationUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
