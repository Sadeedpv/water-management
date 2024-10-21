-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "location" TEXT DEFAULT 'Jalandhar',
    "totalUsage" INTEGER NOT NULL DEFAULT 0,
    "UsageLimit" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterModel" (
    "ModelEmail" TEXT NOT NULL,
    "Modelname" TEXT NOT NULL,
    "totalUsage" INTEGER NOT NULL DEFAULT 0,
    "UsageLimit" INTEGER NOT NULL DEFAULT 0,
    "Date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WaterModel_Modelname_key" ON "WaterModel"("Modelname");

-- AddForeignKey
ALTER TABLE "WaterModel" ADD CONSTRAINT "WaterModel_ModelEmail_fkey" FOREIGN KEY ("ModelEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
