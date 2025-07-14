export const template = {
  EXAMPLE: "example_value",
};

export type Template = (typeof template)[keyof typeof template];

