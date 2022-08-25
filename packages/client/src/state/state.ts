import { proxy } from "valtio";
import { User } from "../types/userTypes";
import { devtools } from "valtio/utils";

export const userState = proxy<{ user: User | null }>({ user: null });

const storage: string | null = localStorage.getItem("user");
try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userObj: User = JSON.parse(storage || "");
  userState.user = userObj;
} catch {
  console.log("asd");
}
devtools(userState, "userState");
