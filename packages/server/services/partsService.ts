import { parts } from "../data/partsData";
import { Part } from "../types/partsTypes";

export const getParts = (): Part[] => {
  return parts;
};

export const getPartById = (id: string): Part | undefined => {
  return parts.find((part) => part.id === id);
};
