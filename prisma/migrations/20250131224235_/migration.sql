/*
  Warnings:

  - You are about to drop the column `image_Logo` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `urlSocial` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "image_Logo",
DROP COLUMN "urlSocial",
ADD COLUMN     "profileAvatar" TEXT,
ADD COLUMN     "profileSocialUrl" TEXT;
