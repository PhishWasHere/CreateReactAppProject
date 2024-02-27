/*
  Warnings:

  - The `priority` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT,
DROP COLUMN "priority",
ADD COLUMN     "priority" INTEGER NOT NULL DEFAULT 0;
