import { useState } from "react";
import Button from "../../elements/Button";
import DeleteUserModal from "./DeleteUserModal";
import { User } from "../../types/userTypes";
import { useQueryClient, useMutation } from "react-query";
import { deleteUserById } from "../../services/usersService";

const UserActions = ({
  user,
  activeUser,
}: {
  user: User;
  activeUser?: User;
}) => {
  const queryClient = useQueryClient();
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);
  const deleteMutation = useMutation(() => deleteUserById(user.id), {
    onSuccess: () => queryClient.invalidateQueries("allUsers"),
  });
  return (
    <div>
      <Button
        iconName="trash"
        className="bg-red-500 hover:bg-red-600 text-white m-1 disabled:bg-gray-400"
        disabled={user.id === activeUser?.id }
        onClick={() => setDeleteModalVis(true)}
      ></Button>
      <Button
        iconName="pencil"
        className="bg-blue-500 hover:bg-blue-600 text-white m-1 disabled:bg-gray-400"
        onClick={() => console.log(user)}
      ></Button>
      <DeleteUserModal
        user={user}
        modalVisibility={deleteModalVis}
        setModalVisibility={setDeleteModalVis}
        deleteMutation={deleteMutation}
        serious={user.role === "admin"}
      />
    </div>
  );
};

export default UserActions;
