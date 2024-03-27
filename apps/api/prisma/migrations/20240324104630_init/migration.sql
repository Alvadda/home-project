-- CreateTable
CREATE TABLE "TrackedApplications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AppUsageSessions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    CONSTRAINT "AppUsageSessions_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "TrackedApplications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
