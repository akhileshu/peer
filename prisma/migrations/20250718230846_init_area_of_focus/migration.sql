-- DropForeignKey
ALTER TABLE "Interest" DROP CONSTRAINT "Interest_focusId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_focusId_fkey";

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "area_of_focus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_focusId_fkey" FOREIGN KEY ("focusId") REFERENCES "area_of_focus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
