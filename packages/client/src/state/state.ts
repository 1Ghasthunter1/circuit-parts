import { proxy } from "valtio";
import { User } from "../types/userTypes";
import { devtools } from "valtio/utils";

const storage: string | null = localStorage.getItem("user");
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const userObj: User = JSON.parse(storage || "");

export const userState = proxy<{ user: User }>({user: userObj});
devtools(userState, "count state");
