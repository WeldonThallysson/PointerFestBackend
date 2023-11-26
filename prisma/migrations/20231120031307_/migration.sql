/*
  Warnings:

  - Added the required column `imagemCidade` to the `cidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cidades" ADD COLUMN     "imagemCidade" TEXT NOT NULL;
