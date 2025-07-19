import { PrismaClient } from "@prisma/client";
import { areaOfFocusList } from "../../data/areaOfFocus";
const prisma = new PrismaClient();

export async function seedAreaOfFocusList() {
  await prisma.areaOfFocus.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.interest.deleteMany();

  await seedUniqueSkillsAndInterests();
  await seedAreaOfFocus();

  console.log("✔ Seeded AreaOfFocus + Skills + Interests");
}

async function seedUniqueSkillsAndInterests() {
  const uniqueSkills = new Map<string, string>();
  const uniqueInterests = new Map<string, string>();

  for (const focus of areaOfFocusList) {
    focus.skills.forEach((s) => uniqueSkills.set(s.id, s.label));
    focus.interests.forEach((i) => uniqueInterests.set(i.id, i.label));
  }

  await prisma.skill.createMany({
    data: Array.from(uniqueSkills.entries()).map(([id, label]) => ({
      id,
      label,
    })),
    skipDuplicates: true,
  });

  await prisma.interest.createMany({
    data: Array.from(uniqueInterests.entries()).map(([id, label]) => ({
      id,
      label,
    })),
    skipDuplicates: true,
  });
}
async function seedAreaOfFocus() {
  for (const focus of areaOfFocusList) {
    await prisma.areaOfFocus.upsert({
      where: { id: focus.id },
      update: {},
      create: {
        id: focus.id,
        name: focus.label,
        skills: {
          connect: focus.skills.map((s) => ({ id: s.id })),
        },
        interests: {
          connect: focus.interests.map((i) => ({ id: i.id })),
        },
      },
    });
  }
}
