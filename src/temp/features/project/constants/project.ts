export const project = {
  EXAMPLE: "example_value",
};

export type Project = (typeof project)[keyof typeof project];

