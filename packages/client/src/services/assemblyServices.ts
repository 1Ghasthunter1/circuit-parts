import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Assembly } from "../types/assemblyTypes";

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
