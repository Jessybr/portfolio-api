-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category_Project" (
    "categoria_id" INTEGER NOT NULL,
    "projeto_id" INTEGER NOT NULL,

    PRIMARY KEY ("categoria_id", "projeto_id"),
    CONSTRAINT "Category_Project_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Category_Project_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Category_Project" ("categoria_id", "projeto_id") SELECT "categoria_id", "projeto_id" FROM "Category_Project";
DROP TABLE "Category_Project";
ALTER TABLE "new_Category_Project" RENAME TO "Category_Project";
CREATE TABLE "new_Technology_Project" (
    "tecnologia_id" INTEGER NOT NULL,
    "projeto_id" INTEGER NOT NULL,

    PRIMARY KEY ("tecnologia_id", "projeto_id"),
    CONSTRAINT "Technology_Project_tecnologia_id_fkey" FOREIGN KEY ("tecnologia_id") REFERENCES "Technology" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Technology_Project_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Technology_Project" ("projeto_id", "tecnologia_id") SELECT "projeto_id", "tecnologia_id" FROM "Technology_Project";
DROP TABLE "Technology_Project";
ALTER TABLE "new_Technology_Project" RENAME TO "Technology_Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
