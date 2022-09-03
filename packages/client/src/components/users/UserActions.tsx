import { useState } from "react";
import Button from "../../elements/Button";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import { User, EditedUser } from "../../types/userTypes";
import { useQueryClient, useMutation } from "react-query";
import { deleteUserById, updateUserById } from "../../services/usersService";

const UserActions = ({
  user,
  activeUser,
}: {
  user: User;
  activeUser?: User;
}) => {
  const queryClient = useQueryClient();
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);
  const [editModalVis, setEditModalVis] = useState<boolean>(false);

  const deleteMutation = useMutation(() => deleteUserById(user.id), {
    onSuccess: () => queryClient.invalidateQueries("allUsers"),
  });
  const editMutation = useMutation((user: EditedUser) => updateUserById(user), {
    onSuccess: async () => {
      await queryClient.invalidateQueries("allUsers");
      setEditModalVis(false);
    },
  });

  return (
    <div>
      <Button
        iconName="trash"
        className="bg-red-500 hover:bg-red-600 text-white m-1 disabled:bg-gray-400"
        disabled={(user.id === activeUser?.id || user.role === "owner") && activeUser?.role !== "owner"}
        onClick={() => setDeleteModalVis(true)}
      ></Button>
      <Button
        iconName="pencil"
        className="bg-blue-500 hover:bg-blue-600 text-white m-1 disabled:bg-gray-400"
        disabled={user.role === "owner" && activeUser?.role !== "owner"}
        onClick={() => setEditModalVis(true)}
      ></Button>
      <DeleteUserModal
        user={user}
        modalVisibility={deleteModalVis}
        setModalVisibility={setDeleteModalVis}
        deleteMutation={deleteMutation}
        serious={user.role === "admin"}
      />
      <EditUserModal
        modalVisibility={editModalVis}
        setModalVisibility={setEditModalVis}
        user={user}
        editMutation={editMutation}
      />
    </div>
  );
};

export default UserActions;
