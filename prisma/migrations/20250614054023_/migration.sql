-- AlterTable
ALTER TABLE "coupon" ADD COLUMN     "isMultipleProducts" BOOLEAN DEFAULT false,
ADD COLUMN     "products" JSONB;
