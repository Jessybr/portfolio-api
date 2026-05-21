-- CreateTable
CREATE TABLE "Projeto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "video_src" TEXT NOT NULL,
    "imagem_src" TEXT NOT NULL,
    "deploy_url" TEXT NOT NULL,
    "github_url" TEXT NOT NULL
);
