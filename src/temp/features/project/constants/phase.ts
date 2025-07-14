export const phase = {
  EXAMPLE: "example_value",
};

export type Phase = (typeof phase)[keyof typeof phase];

