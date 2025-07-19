/*
  Warnings:

  - You are about to drop the column `userId` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `domain` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `intents` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `matchPreferences` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `FriendRequest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[UserPreferenceId]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UserPreferenceId` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PersonaType" AS ENUM ('LEARNER', 'MENTOR', 'COLLABORATOR', 'PRODUCT_IMPROVER', 'SHOWCASER', 'NETWORKER');

-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_userId_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_senderId_fkey";

-- DropIndex
DROP INDEX "Availability_userId_key";

-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "userId",
ADD COLUMN     "UserPreferenceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "domain",
DROP COLUMN "intents",
DROP COLUMN "interests",
DROP COLUMN "matchPreferences",
DROP COLUMN "skills";

-- DropTable
DROP TABLE "FriendRequest";

-- DropEnum
DROP TYPE "Domain";

-- DropEnum
DROP TYPE "RequestStatus";

-- DropEnum
DROP TYPE "UserIntent";

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "persona" "PersonaType" NOT NULL,
    "matchPreferences" "MatchPreference"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "availabilityId" TEXT,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area_of_focus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userPreferencesId" TEXT,

    CONSTRAINT "area_of_focus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "focusId" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "focusId" TEXT,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "status" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "area_of_focus_name_key" ON "area_of_focus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "area_of_focus_userPreferencesId_key" ON "area_of_focus"("userPreferencesId");

-- CreateIndex
CREATE UNIQUE INDEX "Availability_UserPreferenceId_key" ON "Availability"("UserPreferenceId");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area_of_focus" ADD CONSTRAINT "area_of_focus_userPreferencesId_fkey" FOREIGN KEY ("userPreferencesId") REFERENCES "UserPreferences"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "area_of_focus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "area_of_focus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_UserPreferenceId_fkey" FOREIGN KEY ("UserPreferenceId") REFERENCES "UserPreferences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
