/*
  Warnings:

  - The `room` column on the `Employer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rank` column on the `Employer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employer" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
DROP COLUMN "room",
ADD COLUMN     "room" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "rank",
ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";
