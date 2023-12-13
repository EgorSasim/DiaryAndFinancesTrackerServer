/*
  Warnings:

  - You are about to drop the column `taskId` on the `Log` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_taskId_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "taskId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
