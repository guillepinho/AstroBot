-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" TEXT NOT NULL,
    "dataNascimento" TEXT
);
INSERT INTO "new_usuarios" ("dataNascimento", "id", "user") SELECT "dataNascimento", "id", "user" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_usuarios_1" ON "usuarios"("id");
Pragma writable_schema=0;
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
