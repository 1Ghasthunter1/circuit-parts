import axios from "axios";
import { apiBaseUrl } from "../constants";
import { SubmitProject, Project } from "../types/projectTypes";
import { Part } from "../types/partsTypes";
import { Assembly } from "../types/assemblyTypes";
export async function fetchProjects() {
  const { data } = await axios.get<Project[]>(`${apiBaseUrl}/projects`);
  return data;
}

export const fetchProject = async (projectId: string | undefined) => {
  if (projectId) {
    const { data } = await axios.get<Project>(
      `${apiBaseUrl}/projects/${projectId}`
    );
    return data;
  }
  const { data } = await axios.get<Project>(`${apiBaseUrl}/`);
  return data;
};

export const fetchProjectComponents = async (
  projectId: string | undefined
): Promise<Array<Part | Assembly> | undefined> => {
  if (projectId) {
    const { data } = await axios.get<Part[]>(
      `${apiBaseUrl}/projects/${projectId}/components`
    );
    return data;
  }
};

export const fetchProjectAssemblies = async (
  projectId: string | undefined
): Promise<Array<Assembly> | undefined> => {
  if (projectId) {
    const { data } = await axios.get<Assembly[]>(
      `${apiBaseUrl}/assemblies?project=${projectId}`
    );
    return data;
  }
};

export const createProject = async (
  values: SubmitProject
): Promise<Project | null> => {
  try {
    const { data } = await axios.post<Project>(
      `${apiBaseUrl}/projects`,
      values
    );
    return data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error(e?.response?.data || "Unrecognized axios error");
    } else {
      console.error("Unknown error", e);
    }
    return null;
  }
};

export const deleteProjectById = async (
  projectId: string
): Promise<Express.Response> => {
  const { data } = await axios.delete<Project>(
    `${apiBaseUrl}/projects/${projectId}`
  );
  return data;
};
