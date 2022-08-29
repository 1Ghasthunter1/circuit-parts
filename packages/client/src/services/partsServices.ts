import axios from "axios";
import { apiBaseUrl } from "../constants";
import { EditedPart, NewPart, Part } from "../types/partsTypes";

export async function fetchParts() {
  const { data } = await axios.get<Part[]>(`${apiBaseUrl}/parts`);
  return data;
}

export const fetchPart = async (partId: string | undefined) => {
  if (partId) {
    const { data } = await axios.get<Part>(`${apiBaseUrl}/parts/${partId}`);
    return data;
  }
  const { data } = await axios.get<Part>(`${apiBaseUrl}/parts`);
  return data;
};

export const createPart = async (newPart: NewPart) => {
  const { data } = await axios.post<Part>(`${apiBaseUrl}/parts`, newPart);
  return data;
};

export const editPart = async (partId: string, editedPart: EditedPart) => {
  return await axios.put(`${apiBaseUrl}/parts/${partId}`, editedPart);
};

export const deletePartById = async (partId: string) => {
  const response = await axios.delete<Part>(`${apiBaseUrl}/parts/${partId}`);
  return response;
};
