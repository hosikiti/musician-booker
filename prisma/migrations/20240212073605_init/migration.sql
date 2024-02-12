-- CreateTable
CREATE TABLE "Musician" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT NOT NULL,
    "schedule" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "requestService" TEXT NOT NULL,
    "sessionDate" DATETIME NOT NULL,
    "bookedDate" DATETIME NOT NULL,
    "musicianId" INTEGER NOT NULL,
    CONSTRAINT "Booking_musicianId_fkey" FOREIGN KEY ("musicianId") REFERENCES "Musician" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicianToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MusicianToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Musician" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MusicianToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MusicianToService_AB_unique" ON "_MusicianToService"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicianToService_B_index" ON "_MusicianToService"("B");
