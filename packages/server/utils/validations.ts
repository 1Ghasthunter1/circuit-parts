export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isNumber = (value: unknown): value is number => {
  return typeof Number(value) === "number" && !isNaN(Number(value));
};
