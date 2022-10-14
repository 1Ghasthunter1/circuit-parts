import { Outlet } from "react-router";
import { userState } from "../state/state";
import { useSnapshot } from "valtio";
import { Navigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const AppLayout = ({
  header,
  footer,
}: {
  header?: JSX.Element;
  footer?: JSX.Element;
}) => {
  const user = useSnapshot(userState).user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${user?.token}`;

  const content = user ? (
    <div className="bg-gray-100 min-h-screen relative">
      {header}
      <div className="w-screen flex justify-center p-8">
        <div className="max-w-6xl w-full">
          <Outlet />
        </div>
      </div>
      <div className="h-24 mt-48"></div>
      <div className="absolute bottom-0 w-screen">{footer}</div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
  return content;
};

export default AppLayout;
