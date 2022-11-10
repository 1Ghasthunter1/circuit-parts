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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error.response?.data as { error: string };
      const errMsg = err.error;
    }
  }
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

let refreshingToken = false;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!refreshingToken && error.response?.data?.error === "jwt expired") {
      refreshingToken = true;
      await refreshTokenService();
      refreshingToken = false;
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response?.data?.error === "refresh token expired" ||
      error.response?.data?.error === "invalid refresh token"
    ) {
      logoutUser();
      infoToast("Token expired, please sign in again.");
    }
    return Promise.reject(error);
  }
);
