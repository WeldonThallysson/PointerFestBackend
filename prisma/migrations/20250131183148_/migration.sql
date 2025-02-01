/*
  Warnings:

  - You are about to drop the column `statusUser` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "statusUser",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
