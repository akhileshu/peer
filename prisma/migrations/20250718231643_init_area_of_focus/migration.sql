/*
  Warnings:

  - You are about to drop the column `focusId` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `focusId` on the `Skill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_focusId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_focusId_fkey";

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "focusId";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "focusId";

-- CreateTable
CREATE TABLE "_FocusSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FocusSkills_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FocusInterests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FocusInterests_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FocusSkills_B_index" ON "_FocusSkills"("B");

-- CreateIndex
CREATE INDEX "_FocusInterests_B_index" ON "_FocusInterests"("B");

-- AddForeignKey
ALTER TABLE "_FocusSkills" ADD CONSTRAINT "_FocusSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "area_of_focus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FocusSkills" ADD CONSTRAINT "_FocusSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FocusInterests" ADD CONSTRAINT "_FocusInterests_A_fkey" FOREIGN KEY ("A") REFERENCES "area_of_focus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FocusInterests" ADD CONSTRAINT "_FocusInterests_B_fkey" FOREIGN KEY ("B") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
