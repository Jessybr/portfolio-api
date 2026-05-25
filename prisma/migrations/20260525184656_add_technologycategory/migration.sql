/*
  Warnings:

  - You are about to drop the column `curriculo_src` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `foto_src` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `github_url` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin_url` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `nome_completo` on the `Perfil` table. All the data in the column will be lost.
  - You are about to drop the column `deploy_url` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `github_url` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `imagem_src` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `video_src` on the `Project` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Technology" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "iconeSrc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Technology_Project" (
    "tecnologia_id" INTEGER NOT NULL,
    "projeto_id" INTEGER NOT NULL,

    PRIMARY KEY ("tecnologia_id", "projeto_id"),
    CONSTRAINT "Technology_Project_tecnologia_id_fkey" FOREIGN KEY ("tecnologia_id") REFERENCES "Technology" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Technology_Project_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category_Project" (
    "categoria_id" INTEGER NOT NULL,
    "projeto_id" INTEGER NOT NULL,

    PRIMARY KEY ("categoria_id", "projeto_id"),
    CONSTRAINT "Category_Project_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Category_Project_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Perfil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT,
    "email" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "githubUrl" TEXT,
    "curriculoSrc" TEXT,
    "fotoSrc" TEXT
);
INSERT INTO "new_Perfil" ("celular", "email", "id") SELECT "celular", "email", "id" FROM "Perfil";
DROP TABLE "Perfil";
ALTER TABLE "new_Perfil" RENAME TO "Perfil";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "videoSrc" TEXT,
    "imagemSrc" TEXT,
    "deployUrl" TEXT,
    "githubUrl" TEXT
);
INSERT INTO "new_Project" ("ativo", "descricao", "id", "nome") SELECT "ativo", "descricao", "id", "nome" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
