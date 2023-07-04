/*
  Warnings:

  - You are about to drop the column `adminId` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the `App` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employer" DROP CONSTRAINT "Employer_adminId_fkey";

-- AlterTable
ALTER TABLE "Employer" DROP COLUMN "adminId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "room" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "App";

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
