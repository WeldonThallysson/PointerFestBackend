/*
  Warnings:

  - You are about to drop the column `name` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `nome` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "create_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id" TEXT NOT NULL,
    "nomeCidade" TEXT NOT NULL,
    "create_At" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "nomeLocalEvento" TEXT NOT NULL,
    "urlLocalizacaoEvento" TEXT NOT NULL,
    "bannerEvento" TEXT NOT NULL,
    "dataEvento" TEXT NOT NULL,
    "horarioEvento" TEXT NOT NULL,
    "categorias_id" TEXT NOT NULL,
    "cidades_id" TEXT NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_categorias_id_fkey" FOREIGN KEY ("categorias_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_cidades_id_fkey" FOREIGN KEY ("cidades_id") REFERENCES "cidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
