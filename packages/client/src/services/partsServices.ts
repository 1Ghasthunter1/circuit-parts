import axios from "axios";
import { apiBaseUrl } from "../constants";
import { TestPart } from "../types/partsTypes";

export async function fetchParts() {
  const { data } = await axios.get<TestPart[]>(`${apiBaseUrl}/parts`);
  return data;
}

export const fetchPart = async (partId: string | undefined) => {
  if (partId) {
    const { data } = await axios.get<TestPart>(`${apiBaseUrl}/parts/${partId}`);
    return data;
  }
  const { data } = await axios.get<TestPart>(`${apiBaseUrl}/parts`);
  return data;
};
