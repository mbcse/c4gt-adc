/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'ADMIN', 'INSTRUCTOR', 'STUDENT');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- DropTable
DROP TABLE "Course";

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleAssignment" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleVideo" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "ModuleVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "totalWatchTime" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "watchedPercentage" DOUBLE PRECISION NOT NULL,
    "skipEvents" JSONB NOT NULL,
    "pauseEvents" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,
    "generatedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "questions" JSONB NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_videoId_key" ON "Quiz"("videoId");

-- AddForeignKey
ALTER TABLE "ModuleAssignment" ADD CONSTRAINT "ModuleAssignment_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleAssignment" ADD CONSTRAINT "ModuleAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleVideo" ADD CONSTRAINT "ModuleVideo_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleVideo" ADD CONSTRAINT "ModuleVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchLog" ADD CONSTRAINT "WatchLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchLog" ADD CONSTRAINT "WatchLog_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
