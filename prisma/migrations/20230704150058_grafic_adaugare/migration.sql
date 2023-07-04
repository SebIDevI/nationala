/*
  Warnings:

  - You are about to drop the column `checkpoint` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the column `reality` on the `Employer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employer" DROP COLUMN "checkpoint",
DROP COLUMN "goal",
DROP COLUMN "reality";

-- CreateTable
CREATE TABLE "Grafic" (
    "id" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "totalEst" INTEGER NOT NULL,
    "employerId" TEXT,

    CONSTRAINT "Grafic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Grafic" ADD CONSTRAINT "Grafic_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
