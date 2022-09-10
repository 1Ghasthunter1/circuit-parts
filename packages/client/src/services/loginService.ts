import axios, { AxiosError, AxiosResponse } from "axios";
import { apiBaseUrl } from "../constants";
import { AuthUser } from "../types/userTypes";
import { userState } from "../state/state";

export const loginUser = async (email: string, password: string) => {
  try {
    const resp = await axios.post<AuthUser>(`${apiBaseUrl}/login`, {
      email,
      password,
    });
    return resp.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return e.response?.data as { error: string };
    }
  }
};

export const newLoginUser = async (email: string, password: string) => {
  return await axios.post<AuthUser>(`${apiBaseUrl}/login`, {
    email,
    password,
  });
};

export const logoutUser = () => {
  window.localStorage.clear();
  userState.user = null;
};
