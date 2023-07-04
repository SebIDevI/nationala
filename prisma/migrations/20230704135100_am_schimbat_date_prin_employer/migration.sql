/*
  Warnings:

  - The `goal` column on the `Employer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "checkpoint" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "goal",
ADD COLUMN     "goal" INTEGER[];
