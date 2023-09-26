/*
  Warnings:

  - Added the required column `refreshToken` to the `SpotifyUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('SPOTIFY', 'YOUTUBE');

-- DropForeignKey
ALTER TABLE "SpotifyUser" DROP CONSTRAINT "SpotifyUser_userId_fkey";

-- AlterTable
ALTER TABLE "SpotifyUser" ADD COLUMN     "refreshToken" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
