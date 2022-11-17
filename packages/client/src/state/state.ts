import { proxy } from "valtio";
import { UserFromAPI } from "../types/userTypes";
import { FooterState } from "~/types/universalTypes";
import { devtools } from "valtio/utils";
import { logout } from "~/utils/authorization";
import { OrderItem, PopulatedOrder } from "~/types/orderTypes";
import { Project } from "~/types/projectTypes";

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

export const projectState = proxy<{ project: Project | null }>({
  project: null,
});

export const orderState = proxy<{ order: PopulatedOrder | null }>({
  order: null,
});

const storage: string | null = localStorage.getItem("user");
try {
  const userObj: UserFromAPI = JSON.parse(storage || "");
  userState.user = userObj;
} catch {}

export const editedOrderItemsState = proxy<{
  orderItems: Record<string, OrderItem>;
}>({
  orderItems: {},
});

devtools(userState, { name: "userState" });
devtools(orderState, { name: "orderState" });
devtools(projectState, { name: "projectState" });
devtools(editedOrderItemsState, { name: "editedOrderItemsState" });
