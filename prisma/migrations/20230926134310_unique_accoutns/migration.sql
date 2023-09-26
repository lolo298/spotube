/*
  Warnings:

  - A unique constraint covering the columns `[userId,type]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('SPOTIFY', 'YOUTUBE');

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "type",
ADD COLUMN     "type" "accountType" NOT NULL;

-- DropEnum
DROP TYPE "AccountType";

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_type_key" ON "Account"("userId", "type");
