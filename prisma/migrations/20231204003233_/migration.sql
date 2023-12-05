/*
  Warnings:

  - You are about to drop the column `urlIntagramDoComerciante` on the `eventos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "urlIntagramDoComerciante",
ADD COLUMN     "urlInstagramDoComerciante" TEXT;
