export const projectFromTemplate = {
  EXAMPLE: "example_value",
};

export type ProjectFromTemplate = (typeof projectFromTemplate)[keyof typeof projectFromTemplate];

