import HeaderItem from "./HeaderItem";
import LoginLogout from "./LoginLogout";

const Header = () => {
  return (
    <div className="inline-flex items-center bg-gray-100 w-full">
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
        <li className="mx-3">
          <HeaderItem url={"/users"}>Users</HeaderItem>
        </li>
      </ul>
      <div className="flex ml-auto float-right mr-4">
        <LoginLogout />
      </div>
    </div>
  );
};

export default Header;
