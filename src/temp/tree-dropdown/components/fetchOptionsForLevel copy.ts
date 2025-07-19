import { FetchOptionsForLevel, Option } from "./types";
import { HierarchyConfigItem } from "./types";

export const createHierarchicalFetcher = (
  config: HierarchyConfigItem[]
): FetchOptionsForLevel<Option> => {
  return async (levelIndex, selectedOptions) => {
    const levelConfig = config[levelIndex];
    if (!levelConfig) return null;

    const {
      label,
      selectType,
      dependsOnLevel = levelIndex - 1,
      getOptions,
    } = levelConfig;

    const dependencySelected =
      Array.isArray(selectedOptions[dependsOnLevel]) &&
      selectedOptions[dependsOnLevel].length > 0;

    if (dependsOnLevel >= 0 && !dependencySelected) return null;

    const selectedDependencyIds =
      selectedOptions[dependsOnLevel]?.map((opt) => opt.id) ?? [];

    const options = await getOptions({
      selectedOptions,
      levelIndex,
      selectedDependencyIds,
    });
    return { label, options, selectType };
  };
};
