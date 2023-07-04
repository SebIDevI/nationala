-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "room" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "App_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employer" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "rank" TEXT NOT NULL,

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
