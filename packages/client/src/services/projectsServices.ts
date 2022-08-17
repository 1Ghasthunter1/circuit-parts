import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Project } from "../types/projectTypes";

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
