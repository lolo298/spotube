/*
  Warnings:

  - You are about to drop the column `spotifyUserId` on the `Images` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_spotifyUserId_fkey";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "spotifyUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
