import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../elements/Button";
import { useMutation, useQuery } from "react-query";
import { EditedUser, NewUserPassword, User } from "../types/userTypes";
import {
  changeUserPassword,
  getUserById,
  updateUserById,
} from "../services/usersService";
import { useState } from "react";
import AttributeBox from "../elements/AttributeBox";
import { useParams } from "react-router-dom";
import EditDetails from "../components/users/EditDetailsModal";
import ChangePasswordModal from "../components/users/ChangePasswordModal";
import { userState } from "../state/state";
import { useNavigate } from "react-router-dom";
import UserIcon from "~/components/users/UserIcon";

const AccountView = () => {
  const [editModalVis, setEditModalVis] = useState<boolean>(false);
  const [passwordModalVis, setPasswordModalVis] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const userQuery = useQuery<User>(
    `/users/${id || ""}`,
    async () => await getUserById(id as string),
    { enabled: !!id }
  );

  const editMutation = useMutation((user: EditedUser) => updateUserById(user), {
    onSuccess: async () => {
      await userQuery.refetch();
      setEditModalVis(false);
    },
  });

  const changePasswordMutation = useMutation(
    (pwdParams: NewUserPassword) => changeUserPassword(id, pwdParams),
    {
      onSuccess: async () => {
        await userQuery.refetch();
        setPasswordModalVis(false);
        window.localStorage.clear();
        userState.user = null;
        navigate("/login");
      },
    }
  );

  const user = userQuery.data;

  if (!user) return null;
  return (
    <div className="m-8 flex p-4">
      <UserIcon text="HP" size="full" />

      <div className="w-full pr-12 pl-8">
        <div className="">
          <div className="text-4xl font-bold float-top mt-4">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xl text-gray-400 my-2">
            <AttributeBox color={user.role === "admin" ? "red" : "violet"}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </AttributeBox>
          </div>
          <div className="text-2xl text-gray-500 float-top mt-8 ">
            Username: {user.username}
          </div>
          <Button
            iconName="pencil"
            style="bg-blue-500 hover:bg-blue-600 text-white my-2"
            onClick={() => setEditModalVis(true)}
          >
            Edit Details
          </Button>
        </div>
        <EditDetails
          modalVisibility={editModalVis}
          setModalVisibility={setEditModalVis}
          user={user}
          editMutation={editMutation}
        />
        <div className="mt-4 relative flex items-centerflex-grow border-t border-gray-400" />
        <span className="text-gray-400 font-bold text-lg">
          Basic Information
        </span>
        <div className="text-xl">
          <div>
            <span className="text-gray-500">Username:</span>{" "}
            <span className="font-bold">{user.username}</span>
          </div>
          <div>
            <span className="text-gray-500">First Name:</span>{" "}
            <span className="font-bold">{user.firstName}</span>
          </div>
          <div>
            <span className="text-gray-500">Last Name:</span>{" "}
            <span className="font-bold">{user.lastName}</span>
          </div>
          <div>
            <span className="text-gray-500">Email:</span>{" "}
            <span className="font-bold">{user.email}</span>
          </div>
        </div>
        <div className="mt-4 relative flex items-centerflex-grow border-t border-gray-400" />

        <div>
          <div className="text-gray-400 font-bold text-lg">Password</div>
          <Button
            iconName="lock"
            style="bg-blue-500 hover:bg-blue-600 text-white my-4"
            onClick={() => setPasswordModalVis(true)}
          >
            Reset Password
          </Button>
          <ChangePasswordModal
            modalVisibility={passwordModalVis}
            setModalVisibility={setPasswordModalVis}
            editMutation={changePasswordMutation}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountView;
