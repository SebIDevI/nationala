/*
  Warnings:

  - A unique constraint covering the columns `[cod]` on the table `ProductApp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProductApp" ALTER COLUMN "cod" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductApp_cod_key" ON "ProductApp"("cod");
