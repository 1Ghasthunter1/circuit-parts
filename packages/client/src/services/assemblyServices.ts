import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Assembly, NewAssembly } from "../types/assemblyTypes";

export const fetchAssembly = async (assemblyId: string | undefined) => {
  if (assemblyId) {
    const { data } = await axios.get<Assembly>(
      `${apiBaseUrl}/assemblies/${assemblyId}`
    );
    return data;
  }
  const { data } = await axios.get<Assembly>(`${apiBaseUrl}/assemblies`);
  return data;
};

export const createAssembly = async (newAssembly: NewAssembly) => {
  const { data } = await axios.post<Assembly>(
    `${apiBaseUrl}/assemblies`,
    newAssembly
  );
  return data;
};
