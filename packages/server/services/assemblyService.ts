import { DatabaseAssembly } from "../types/assemblyTypes";
import AssemblyModel from "../models/assembly";

export const getAssemblies = async (): Promise<DatabaseAssembly[] | null> => {
  const resp = await AssemblyModel.find({});
  return resp;
};

export const getAssemblyById = async (
  id: string
): Promise<DatabaseAssembly | null> => {
  const resp = await AssemblyModel.findById<DatabaseAssembly>(id);
  return resp;
};
