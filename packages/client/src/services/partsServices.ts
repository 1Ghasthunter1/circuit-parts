import axios from "axios";
import { partsBaseUrl } from "../constants";
import { TestPart } from "../types/partsTypes";

export async function fetchParts() {
  const { data } = await axios.get<TestPart>(`${partsBaseUrl}`);
  return data;
}
