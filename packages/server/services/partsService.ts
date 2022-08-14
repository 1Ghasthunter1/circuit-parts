import { parts } from "../data/partsData";
import { TestPart } from "../types/partsTypes";

export const getParts = (): TestPart[] => {
  return parts;
};

export const getPartById = (id: string): TestPart | undefined => {
  return parts.find((part) => part.id === id);
};
