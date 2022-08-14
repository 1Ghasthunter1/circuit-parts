import { parts } from "../data/partsData";
import { TestPart } from "../types/partsTypes";

export const getParts = (): TestPart[] => {
  return parts;
};
