import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Assembly, NewAssembly } from "../types/assemblyTypes";
import { Part } from "../types/partsTypes";

export const fetchAssembly = async (assemblyId: string) => {
  const { data } = await axios.get<Assembly>(
    `${apiBaseUrl}/assemblies/${assemblyId}`
  );
  return data;
};

export const fetchAssemblyComponents = async (assemblyId: string) => {
  const { data } = await axios.get<(Part | Assembly)[]>(
    `${apiBaseUrl}/assemblies/${assemblyId}/components`
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

export const deleteAssemblyById = async (assemblyId: string) => {
  const response = await axios.delete<Assembly>(
    `${apiBaseUrl}/assemblies/${assemblyId}`
  );
  return response;
};
