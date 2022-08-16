import { parts } from "../data/partsData";
import { Part } from "../types/partsTypes";
import PartModel from "../models/part";
export const getParts = (): Part[] => {
  return parts;
};

export const getPartById = async (id: string): Promise<Part | null> => {
  const resp = await PartModel.findById<Part>(id);
  return resp;
};
