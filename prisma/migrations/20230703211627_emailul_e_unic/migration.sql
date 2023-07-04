/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ProductApp" (
    "id" TEXT NOT NULL,
    "nume" TEXT NOT NULL,
    "cod" TEXT NOT NULL,
    "pos" INTEGER NOT NULL,

    CONSTRAINT "ProductApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employer_email_key" ON "Employer"("email");
