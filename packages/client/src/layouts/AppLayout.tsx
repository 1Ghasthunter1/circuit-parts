import { Outlet } from "react-router";
import { userState } from "../state/state";
import { useSnapshot } from "valtio";
import { Navigate } from "react-router-dom";
import axios from "axios";
const AppLayout = ({ header }: { header?: JSX.Element }) => {
  const userSnapshot = useSnapshot(userState);
  const user = userSnapshot.user;
  if (user)
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const content = user ? (
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
