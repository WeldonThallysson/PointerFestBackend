/*
  Warnings:

  - You are about to drop the column `amount` on the `eventos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "amount",
ADD COLUMN     "locaisCompraIngresso" TEXT[],
ADD COLUMN     "urlIntagramDoComerciante" TEXT;
