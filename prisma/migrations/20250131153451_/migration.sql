/*
  Warnings:

  - Made the column `cpfCnpj` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDate` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cpfCnpj" SET NOT NULL,
ALTER COLUMN "birthDate" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL;
