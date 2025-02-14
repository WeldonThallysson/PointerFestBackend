/*
  Warnings:

  - You are about to drop the column `idCategory` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idCommercials` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idCoupon` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idEvent` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idMethodsPayments` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idPlan` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idProduct` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idPurchase` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idTypeComercials` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idTypesProducts` on the `bin` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `bin` table. All the data in the column will be lost.
  - Added the required column `data` to the `bin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `bin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableName` to the `bin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idCategory_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idCommercials_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idCoupon_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idEvent_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idMethodsPayments_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idPlan_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idPurchase_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idTypeComercials_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idTypesProducts_fkey";

-- DropForeignKey
ALTER TABLE "bin" DROP CONSTRAINT "bin_idUser_fkey";

-- AlterTable
ALTER TABLE "bin" DROP COLUMN "idCategory",
DROP COLUMN "idCommercials",
DROP COLUMN "idCoupon",
DROP COLUMN "idEvent",
DROP COLUMN "idMethodsPayments",
DROP COLUMN "idPlan",
DROP COLUMN "idProduct",
DROP COLUMN "idPurchase",
DROP COLUMN "idTypeComercials",
DROP COLUMN "idTypesProducts",
DROP COLUMN "idUser",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "itemId" TEXT NOT NULL,
ADD COLUMN     "tableName" TEXT NOT NULL;
