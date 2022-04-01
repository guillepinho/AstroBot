-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" INTEGER NOT NULL,
    "dataNascimento" TEXT
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_usuarios_1" ON "usuarios"("id");
Pragma writable_schema=0;
