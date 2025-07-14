export function getRandomSubset<T>(arr: T[], maxSize: number): T[] {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  const size = Math.floor(Math.random() * (maxSize + 1));
  return shuffled.slice(0, size);
}

import { writeFileSync } from "fs";

/**
 * Write any data from a model into a JSON file
 * @param filename name of output file
 * @param modelCallback async function to fetch data
 * @example await writeDataToJson("all_users.json", () => prisma.user.findMany());
 */
export async function writeDataToJson<T>(
  filename: string,
  modelCallback: () => Promise<T>
) {
  const data = await modelCallback();
  writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`✅ Data written to ${filename}`);
}
