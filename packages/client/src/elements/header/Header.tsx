import HeaderItem from "./HeaderItem";

const Header = () => {
  return (
    <div className="inline-flex items-center bg-gray-100 w-full">
      <a className="m-4 mr-12 text-xl font-bold">696 PMS</a>
      <ul className="flex">
        <li className="mx-3">
          <HeaderItem url={""}>Dashboard</HeaderItem>
        </li>
        <li className="mx-3">
          <HeaderItem url={"/parts"}>Parts</HeaderItem>
        </li>
        <li className="mx-3">
          <HeaderItem url={"/orders"}>Orders</HeaderItem>
        </li>
        <li className="mx-3">
          <HeaderItem url={"/users"}>Users</HeaderItem>
        </li>
      </ul>
      <div className="flex ml-auto float-right mr-4">
        <span className="font-bold text-l">Sign Out</span>
      </div>
    </div>
  );
};

export default Header;
