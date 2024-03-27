-- CreateTable
CREATE TABLE "AppTracking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TrackedApplications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "processName" TEXT NOT NULL,
    "titleDetail" TEXT,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AppUsageSessions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "applicationId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "AppUsageSessions_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "TrackedApplications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
