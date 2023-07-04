/*
  Warnings:

  - You are about to drop the column `nume` on the `Grafic` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Grafic` table. All the data in the column will be lost.
  - You are about to drop the column `totalEst` on the `Grafic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Grafic" DROP COLUMN "nume",
DROP COLUMN "total",
DROP COLUMN "totalEst",
ADD COLUMN     "joi" TEXT,
ADD COLUMN     "lun" TEXT,
ADD COLUMN     "mar" TEXT,
ADD COLUMN     "mie" TEXT,
ADD COLUMN     "vin" TEXT;
