/*
  Warnings:

  - Added the required column `idUserOther` to the `bin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bin" ADD COLUMN     "idUserOther" TEXT NOT NULL;
