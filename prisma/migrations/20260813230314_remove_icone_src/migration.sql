/*
  Warnings:

  - You are about to drop the column `iconeSrc` on the `SoftSkill` table. All the data in the column will be lost.
  - You are about to drop the column `iconeSrc` on the `Technology` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SoftSkill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);
INSERT INTO "new_SoftSkill" ("id", "nome") SELECT "id", "nome" FROM "SoftSkill";
DROP TABLE "SoftSkill";
ALTER TABLE "new_SoftSkill" RENAME TO "SoftSkill";
CREATE TABLE "new_Technology" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);
INSERT INTO "new_Technology" ("id", "nome") SELECT "id", "nome" FROM "Technology";
DROP TABLE "Technology";
ALTER TABLE "new_Technology" RENAME TO "Technology";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
