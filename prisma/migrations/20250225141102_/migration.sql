-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "idThemeImageUrl" TEXT,
ALTER COLUMN "themeImageUrl" DROP NOT NULL;
