import { Outlet } from "react-router";

const AppLayout = ({ header }: { header?: JSX.Element }) => {
  return (
    <>
      {header}
      <Outlet />
    </>
  );
};

export default AppLayout;
