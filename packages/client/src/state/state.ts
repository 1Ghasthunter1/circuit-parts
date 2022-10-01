import { proxy } from "valtio";
import { AuthUser } from "../types/userTypes";
import { FooterState } from "~/types/universalTypes";
import { devtools } from "valtio/utils";
import { logout } from "~/utils/logout";
export const userState = proxy<{ user: AuthUser | null }>();
export const footerState = proxy<FooterState>({
  links: [
    { text: "Projects", url: "/projects" },
    { text: "Dashboard", url: "/dashboard" },
    { text: "Account", url: "/account" },
    { text: "Sign Out", url: "/projects", onClick: () => logout() },
  ],
});
export const dashboardState = proxy<FooterState>({
  links: [
    { text: "Projects", url: "/projects" },
    { text: "Dashboard", url: "/dashboard" },
    { text: "Account", url: "/account" },
    { text: "Sign Out", url: "/projects", onClick: () => logout() },
  ],
});

const storage: string | null = localStorage.getItem("user");
try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userObj: AuthUser = JSON.parse(storage || "");
  userState.user = userObj;
  // eslint-disable-next-line no-empty
} catch {}
devtools(userState, "userState");
