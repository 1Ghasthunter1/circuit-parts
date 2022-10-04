import { userState } from "~/state/state";
import { infoToast } from "./toast/Toasts";

export const logout = () => {
  window.localStorage.clear();
  userState.user = null;
  infoToast("Signed out! Please sign in again");
};
