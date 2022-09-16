import { Outlet } from "react-router";
import { userState } from "../state/state";
import { useSnapshot } from "valtio";
import { Navigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import services from "../services/services";
import { logoutUser } from "../services/loginService";

const AppLayout = ({ header }: { header?: JSX.Element }) => {
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
    <div className="bg-gray-100 h-screen">
      {header}
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
  return content;
};

export default AppLayout;
