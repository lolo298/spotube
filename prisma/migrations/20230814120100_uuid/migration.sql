/*
  Warnings:

  - The primary key for the `SpotifyUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_spotifyUserId_fkey";

-- DropForeignKey
ALTER TABLE "SpotifyUser" DROP CONSTRAINT "SpotifyUser_userId_fkey";

-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "spotifyUserId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SpotifyUser" DROP CONSTRAINT "SpotifyUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SpotifyUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SpotifyUser_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "SpotifyUser" ADD CONSTRAINT "SpotifyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_spotifyUserId_fkey" FOREIGN KEY ("spotifyUserId") REFERENCES "SpotifyUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
