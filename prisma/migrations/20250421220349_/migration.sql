/*
  Warnings:

  - You are about to drop the column `companyName` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "companyName";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "companyName" TEXT;
