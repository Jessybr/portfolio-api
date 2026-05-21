-- CreateTable
CREATE TABLE "Perfil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "linkedin_url" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "curriculo_src" TEXT NOT NULL,
    "foto_src" TEXT NOT NULL
);
