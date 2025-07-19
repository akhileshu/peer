import { PrismaClient } from "@prisma/client";
import { seedTemplates } from "./templates";
import { seedAreaOfFocusList } from "./seedAreaOfFocusList";

const prisma = new PrismaClient();

/**
 * - "seed": "ts-node --compiler-options '{\"module\":\"CommonJS\"}' prisma/seed/index.ts"
 * - npx prisma db seed
 */
async function main() {
  console.log("🌱 Starting seed...");
  await seedAreaOfFocusList();
  console.log("✅ Seed completed.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
