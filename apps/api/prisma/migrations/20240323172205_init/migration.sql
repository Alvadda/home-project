/*
  Warnings:

  - You are about to drop the `EntertainmentUsage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EntertainmentUsage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AppTracking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL
);
