import HeaderItem from "./HeaderItem";
import LoginDropdown from "./LoginDropdown";

import { userState } from "../../state/state";
import { useSnapshot } from "valtio";
const Header = () => {
  const user = useSnapshot(userState).user;
  return (
    <div className="inline-flex bg-white shadow items-center w-full">
      <a className="m-4 mr-12 text-xl font-bold">696 PMS</a>
      <ul className="flex">
        <li className="mx-3">
          <HeaderItem url="/dashboard">Dashboard</HeaderItem>
        </li>
        <li className="mx-3">
          <HeaderItem url={"/projects"}>Projects</HeaderItem>
        </li>
        <li className="mx-3">
          <HeaderItem url={"/orders"}>Orders</HeaderItem>
        </li>
        {(user?.role === "admin" || user?.role === "owner") && (
          <li className="mx-3">
            <HeaderItem url={"/users"}>Users</HeaderItem>
          </li>
        )}
      </ul>
      <div className="flex ml-auto float-right mr-4">
        <LoginDropdown />
      </div>
    </div>
  );
};

export default Header;
