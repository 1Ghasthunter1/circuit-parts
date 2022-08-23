import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Assembly, NewAssembly } from "../types/assemblyTypes";

export const fetchAssembly = async (assemblyId: string) => {
  const { data } = await axios.get<Assembly>(
    `${apiBaseUrl}/assemblies/${assemblyId}`
  );
  return data;
};

export const createAssembly = async (newAssembly: NewAssembly) => {
  const { data } = await axios.post<Assembly>(
    `${apiBaseUrl}/assemblies`,
    newAssembly
  );
  return data;
};

export const deleteAssemblyById = async (
  assemblyId: string
): Promise<Express.Response> => {
  const { data } = await axios.delete<Assembly>(
    `${apiBaseUrl}/projects/${assemblyId}`
  );
  return data;
};
