/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - Made the column `dueDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dueDate` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "dueDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ALTER COLUMN "dueDate" SET NOT NULL;
