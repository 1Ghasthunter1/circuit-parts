import axios from "axios";
import { apiBaseUrl } from "../constants";
import { NewPart, Part } from "../types/partsTypes";

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
