-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "goal" TEXT[] DEFAULT ARRAY['']::TEXT[],
ADD COLUMN     "reality" TEXT[] DEFAULT ARRAY['']::TEXT[];
