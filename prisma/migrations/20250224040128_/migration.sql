/*
  Warnings:

  - You are about to drop the column `idUserOther` on the `bin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bin" DROP COLUMN "idUserOther",
ADD COLUMN     "idUserOwner" TEXT;
