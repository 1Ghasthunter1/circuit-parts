import { Outlet } from "react-router";
import { userState } from "../state/state";
import { useSnapshot } from "valtio";
import { Navigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import services from "../services/services";
import { logoutUser } from "../services/loginService";

const AppLayout = ({
  header,
  footer,
}: {
  header?: JSX.Element;
  footer?: JSX.Element;
}) => {
  const userSnapshot = useSnapshot(userState);
  const user = userSnapshot.user;
  if (user) {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.data?.error === "jwt expired") logoutUser();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument
        return Promise.reject(error);
      }
    );
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

  const content = user ? (
    <div className="bg-gray-100 min-h-screen relative">
      {header}
      <div className="w-screen flex justify-center">
        <div className="max-w-4xl w-full">
          <Outlet />
        </div>
      </div>
      <div className="h-24"></div>
      <div className="absolute bottom-0 w-screen">{footer}</div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
  return content;
};

export default AppLayout;
