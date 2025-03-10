/*
  Warnings:

  - You are about to drop the column `value` on the `typesProducts` table. All the data in the column will be lost.
  - Added the required column `position` to the `typesProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "typesProducts" DROP COLUMN "value",
ADD COLUMN     "position" TEXT NOT NULL;
