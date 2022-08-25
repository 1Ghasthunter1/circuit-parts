import { Outlet } from "react-router";
import { userState } from "../state/state";
import { useSnapshot } from "valtio";
import { Navigate } from "react-router-dom";
const AppLayout = ({ header }: { header?: JSX.Element }) => {
  const userSnapshot = useSnapshot(userState);
  const user = userSnapshot.user;
  console.log(user);

  const content =
    user?.role === "admin" ? (
      <>
        {header}
        <Outlet />
      </>
    ) : (
      <Navigate to="/login" />
    );
  return content;
};

export default AppLayout;
