import axios from "axios";
import { apiBaseUrl } from "../constants";
import { AuthUser } from "../types/userTypes";
import { userState } from "../state/state";

console.log(apiBaseUrl);
console.log("this works!");
export const loginUser = async (email: string, password: string) => {
  try {
    const resp = await axios.post<AuthUser>(`${apiBaseUrl}/login`, {
      email,
      password,
    });
    return resp.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 401)
        return { error: "Your username or password is incorrect" };
    } else return { error: "Unknown error" };
  }
};

export const logoutUser = () => {
  window.localStorage.clear();
  userState.user = null;
};
