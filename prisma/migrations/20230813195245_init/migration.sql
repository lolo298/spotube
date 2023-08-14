-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotifyUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "spotifyId" TEXT NOT NULL,
    "explicitContent" BOOLEAN NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "SpotifyUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "spotifyUserId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyUser_userId_key" ON "SpotifyUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyUser_spotifyId_key" ON "SpotifyUser"("spotifyId");

-- AddForeignKey
ALTER TABLE "SpotifyUser" ADD CONSTRAINT "SpotifyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_spotifyUserId_fkey" FOREIGN KEY ("spotifyUserId") REFERENCES "SpotifyUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
