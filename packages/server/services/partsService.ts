import { Part } from "../types/partsTypes";
import PartModel from "../models/part";

export const getParts = async (): Promise<Part[] | null> => {
  const resp = await PartModel.find({});
  return resp;
};

export const getPartById = async (id: string): Promise<Part | null> => {
  const resp = await PartModel.findById<Part>(id);
  return resp;
};
