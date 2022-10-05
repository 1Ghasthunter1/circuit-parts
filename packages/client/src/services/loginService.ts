import axios, { AxiosError, AxiosResponse } from "axios";
import { apiBaseUrl } from "../constants";
import {
  AuthUser,
  RefreshTokenResponse,
  UserFromAPI,
} from "../types/userTypes";
import { userState } from "../state/state";
import type {} from "vite";
import { infoToast } from "~/utils/toast/Toasts";

export const loginUser = async (email: string, password: string) => {
  try {
    const resp = await axios.post<UserFromAPI>(`${apiBaseUrl}/login`, {
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

export const refreshTokenService = async () => {
  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${apiBaseUrl}/refresh`,
      {
        refreshToken: userState.user?.refreshToken,
      }
    );
    if (!userState.user) return null;
    const data = response.data;
    userState.user.token = data.token;
    userState.user.refreshToken = data.refreshToken;
  } catch (err) {}
};

export const logoutUser = async () => {
  try {
    await axios.post(`${apiBaseUrl}/login/signout`, {
      userId: userState.user?.id,
      refreshToken: userState.user?.refreshToken,
    });
  } catch {
    console.log("error with signing user out");
  }
  window.localStorage.clear();
  userState.user = null;
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (userState.user) {
      if (error.response?.data?.error === "jwt expired") {
        await refreshTokenService();
      } else if (
        error.response?.data?.error === "refresh token expired" ||
        error.response?.data?.error === "invalid refresh token"
      ) {
        logoutUser();
        infoToast("Token expired, please sign in again.");
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
