/*
  Warnings:

  - You are about to drop the column `categorias_id` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `cidades_id` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `urlInstagramDoComerciante` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `master` on the `usuarios` table. All the data in the column will be lost.
  - Added the required column `iconeCategoria` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlBannerCategoria` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoria_id` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoVisibilidadeEvento` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_categorias_id_fkey";

-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_cidades_id_fkey";

-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "iconeCategoria" TEXT NOT NULL,
ADD COLUMN     "urlBannerCategoria" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "categorias_id",
DROP COLUMN "cidades_id",
DROP COLUMN "urlInstagramDoComerciante",
ADD COLUMN     "categoria_id" TEXT NOT NULL,
ADD COLUMN     "restricoesEvento" TEXT,
ADD COLUMN     "statusEvento" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tipoVisibilidadeEvento" TEXT NOT NULL,
ADD COLUMN     "urlPostRedeSocial" TEXT;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "master",
ADD COLUMN     "cpfCnpj" TEXT,
ADD COLUMN     "dataNascimento" TEXT,
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "idCustomer" TEXT,
ADD COLUMN     "statusUsuario" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "urlLogoUsuario" TEXT,
ADD COLUMN     "urlRedeSocial" TEXT;

-- CreateTable
CREATE TABLE "lixeira" (
    "id" TEXT NOT NULL,
    "evento_id" TEXT NOT NULL,

    CONSTRAINT "lixeira_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lixeira" ADD CONSTRAINT "lixeira_evento_id_fkey" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
