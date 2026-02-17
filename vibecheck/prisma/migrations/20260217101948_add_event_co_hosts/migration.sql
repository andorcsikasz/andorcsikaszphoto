-- CreateTable
CREATE TABLE "EventCoHost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EventCoHost_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "EventCoHost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "EventCoHost_eventId_idx" ON "EventCoHost"("eventId");

-- CreateIndex
CREATE INDEX "EventCoHost_userId_idx" ON "EventCoHost"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EventCoHost_eventId_userId_key" ON "EventCoHost"("eventId", "userId");
