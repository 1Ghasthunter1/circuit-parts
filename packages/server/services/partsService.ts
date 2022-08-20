import { DatabasePart } from "../types/partsTypes";
import PartModel from "../models/part";

export const getParts = async (): Promise<DatabasePart[] | null> => {
  const resp = await PartModel.find({});
  return resp;
};

export const getPartById = async (id: string): Promise<DatabasePart | null> => {
  const resp = await PartModel.findById<DatabasePart>(id);
  return resp;
};
