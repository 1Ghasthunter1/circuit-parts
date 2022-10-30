import { proxy } from "valtio";
import { UserFromAPI } from "../types/userTypes";
import { FooterState } from "~/types/universalTypes";
import { devtools } from "valtio/utils";
import { logout } from "~/utils/authorization";
import { PopulatedOrder } from "~/types/orderTypes";

export const userState = proxy<{ user: UserFromAPI | null }>();

export const footerState = proxy<FooterState>({
  links: [
    { text: "Projects", url: "/projects" },
    { text: "Dashboard", url: "/dashboard" },
    { text: "Account", url: "/account" },
    { text: "Sign Out", url: "/projects", onClick: () => logout() },
  ],
});

export const projectSelectState = proxy<{ project: string }>({
  project: "",
});

export const orderState = proxy<{ order: PopulatedOrder | null }>({
  order: null,
});

const storage: string | null = localStorage.getItem("user");
try {
  const userObj: UserFromAPI = JSON.parse(storage || "");
  userState.user = userObj;
} catch {}
devtools(userState, { name: "userState" });
devtools(orderState, { name: "orderState" });
