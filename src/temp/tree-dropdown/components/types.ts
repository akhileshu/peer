export type Option = { id: string; title: string };
export type FetchOptionsForLevel<T extends Option> = (
  levelIndex: number,
  selectedOptions: T[][] // 2D list: one per level
) => Promise<{
  label: string;
  options: T[];
  selectType: "single" | "multiple";
} | null>;

export const SELECT_TYPE = {
  single: "single",
  multiple: "multiple",
} as const;

export type SelectType = (typeof SELECT_TYPE)[keyof typeof SELECT_TYPE];

export const ACTION_TYPE = {
  add: "ADD",
  remove: "REMOVE",
  set: "SET",
} as const;

export type ActionType = (typeof ACTION_TYPE)[keyof typeof ACTION_TYPE];



export type HierarchyConfigItem = {
  label: string;
  selectType: SelectType;
  getOptions: (context: {
    selectedOptions: Record<string, Option[]>;
    parentIdPath: string[];
  }) => Promise<Option[]>;
  children?: HierarchyConfigItem[];
};
