import { logoutUser } from "~/services/loginService";
import { infoToast } from "./toast/Toasts";

export const logout = () => {
  logoutUser();
  infoToast("Signed out! Please sign in again.");
};
