import { toast } from "react-toastify";
import { userState } from "~/state/state";

export const logout = () => {
  window.localStorage.clear();
  userState.user = null;
  toast.success("Signed out! Please sign in again.");
};
