import { Assembly } from "../types/assemblyTypes";
import AssemblyModel from "../models/assembly";

export const getAssemblies = async (): Promise<Assembly[] | null> => {
  const resp = await AssemblyModel.find({});
  return resp;
};

export const getAssemblyById = async (id: string): Promise<Assembly | null> => {
  const resp = await AssemblyModel.findById<Assembly>(id);
  return resp;
};
