-- AlterTable
ALTER TABLE "ProductApp" ADD COLUMN     "productId" TEXT;

-- AddForeignKey
ALTER TABLE "ProductApp" ADD CONSTRAINT "ProductApp_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
