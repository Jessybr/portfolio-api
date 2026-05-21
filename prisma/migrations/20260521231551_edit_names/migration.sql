/*
  Warnings:

  - You are about to drop the `Projeto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Projeto";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "video_src" TEXT NOT NULL,
    "imagem_src" TEXT NOT NULL,
    "deploy_url" TEXT NOT NULL,
    "github_url" TEXT NOT NULL
);
