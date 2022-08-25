import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userState } from "../state/state";
import { useSnapshot } from "valtio";
const AccountView = () => {
  const user = useSnapshot(userState).user;
  if (!user) return null;
  return (
    <div className="m-8 flex">
      <FontAwesomeIcon icon="circle-user" size="10x" color="#777777" />
      <div className="pl-8">
        <div className="text-4xl font-bold float-top mt-8">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-xl text-gray-400">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
        <div className="text-2xl text-gray-500 float-top mt-8 ">
          Username: {user.username}
        </div>
      </div>
    </div>
  );
};

export default AccountView;
