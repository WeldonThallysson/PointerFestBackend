/*
  Warnings:

  - You are about to drop the column `imagemCidade` on the `cidades` table. All the data in the column will be lost.
  - Added the required column `bannerCidade` to the `cidades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoCidade` to the `cidades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cidades" DROP COLUMN "imagemCidade",
ADD COLUMN     "bannerCidade" TEXT NOT NULL,
ADD COLUMN     "logoCidade" TEXT NOT NULL;
