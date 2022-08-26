import axios from "axios";
import { apiBaseUrl } from "../constants";
import { AuthUser } from "../types/userTypes";

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post<AuthUser>(`${apiBaseUrl}/login`, {
      email,
      password,
    });
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401)
        return { error: "Your username or password is incorrect" };
    } else return { error: "Unknown error" };
  }
};
