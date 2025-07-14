export const feature = {
  EXAMPLE: "example_value",
};

export type Feature = (typeof feature)[keyof typeof feature];

