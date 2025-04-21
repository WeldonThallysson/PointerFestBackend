-- AlterTable
ALTER TABLE "products" ADD COLUMN     "companyName" TEXT,
ALTER COLUMN "expirationDate" DROP NOT NULL;
