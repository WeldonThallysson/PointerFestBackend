/*
  Warnings:

  - A unique constraint covering the columns `[idProduct]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "idPlan" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "idProduct" TEXT,
ADD COLUMN     "idProductSubscribe" TEXT;

-- CreateTable
CREATE TABLE "product_subscription" (
    "id" TEXT NOT NULL,
    "idUserOwner" TEXT NOT NULL,
    "idProduct" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3),

    CONSTRAINT "product_subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_idProduct_key" ON "users"("idProduct");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_idPlan_fkey" FOREIGN KEY ("idPlan") REFERENCES "plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_subscription" ADD CONSTRAINT "product_subscription_idUserOwner_fkey" FOREIGN KEY ("idUserOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_subscription" ADD CONSTRAINT "product_subscription_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
