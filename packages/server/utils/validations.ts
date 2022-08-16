export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isNumber = (num: unknown): boolean => {
  return typeof num === "number" || num instanceof Number;
};
