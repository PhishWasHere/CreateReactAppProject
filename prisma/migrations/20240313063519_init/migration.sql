/*
  Warnings:

  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "dueDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "dueDate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
