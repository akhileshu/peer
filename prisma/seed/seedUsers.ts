/*
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { allGoals, allSkills, domains } from "@/lib/data/profile";
import { getRandomSubset } from "./utils";

const prisma = new PrismaClient();
const NUM_USERS = 1000;

export async function seedUsers() {
  const usersToCreate = [];

  for (let i = 0; i < NUM_USERS; i++) {
    const name = faker.person.fullName();
    const email = faker.internet
      .email({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
        provider: `seed${i}.example.com`,
      })
      .toLowerCase();

    const domain = faker.helpers.arrayElement(domains);
    const skills = getRandomSubset(allSkills, 5);
    const learning = getRandomSubset(
      allSkills.filter((s) => !skills.includes(s)),
      3
    );
    const goals = getRandomSubset(allGoals, 3);
    const availability = faker.number.int({ min: 1, max: 20 });
    const image = faker.image.avatar();

    usersToCreate.push({
      name,
      email,
      emailVerified: faker.date.past(),
      image,
      domain,
      skills,
      learning,
      goals,
      availability,
    });
  }

  console.log(`Creating ${usersToCreate.length} users...`);
  await prisma.user.createMany({
    data: usersToCreate,
    skipDuplicates: true,
  });

  console.log(`✅ Seeding finished: ${NUM_USERS} users created.`);
}

*/