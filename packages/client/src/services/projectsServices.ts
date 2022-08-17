import axios from "axios";
import { apiBaseUrl } from "../constants";
import { SubmitProject, Project } from "../types/projectTypes";

export async function fetchProjects() {
  const { data } = await axios.get<Project[]>(`${apiBaseUrl}/projects`);
  return data;
}

export const fetchProject = async (projectId: string | undefined) => {
  if (projectId) {
    const { data } = await axios.get<Project>(`${apiBaseUrl}/${projectId}`);
    return data;
  }
  const { data } = await axios.get<Project>(`${apiBaseUrl}/`);
  return data;
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
