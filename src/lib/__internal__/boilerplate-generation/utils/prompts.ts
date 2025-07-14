import { FeatureConfig } from "../types/types";

export function getPartChoices(feature: FeatureConfig) {
  const mapping = {
    components: "Components",
    apiRoutes: "API Routes",
    dbModel: "Database Models",
    hooks: "Hooks",
    store: "Store",
    zodSchemas: "Zod Schemas",
    types: "Types",
    services: "Services",
    tests: "Tests",
    pages: "Pages",
  };

  return Object.entries(mapping)
    .filter(([key]) => feature[key as keyof FeatureConfig])
    .map(([key, label]) => ({ name: label, value: key }));
}
export function getDefaultParts(feature: FeatureConfig) {
  return Object.keys(feature).filter(
    (key) =>
      key !== "name" &&
      feature[key as keyof FeatureConfig] &&
      (Array.isArray(feature[key as keyof FeatureConfig])
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (feature[key as keyof FeatureConfig] as any[]).length > 0
        : true)
  );
}
