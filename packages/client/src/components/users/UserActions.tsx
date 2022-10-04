import { useState } from "react";
import Button from "../../elements/Button";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import { User, EditedUser } from "../../types/userTypes";
import { useQueryClient, useMutation } from "react-query";
import { deleteUserById, updateUserById } from "../../services/usersService";
import toast from "react-hot-toast";

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
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers");
      setDeleteModalVis(false);
      toast.success("Deleted user");
    },
    onError: () => {
      toast.error("Error deleting user");
    },
  });
  const editMutation = useMutation((user: EditedUser) => updateUserById(user), {
    onSuccess: async () => {
      await queryClient.invalidateQueries("allUsers");
      setEditModalVis(false);
      toast.success("Saved user");
    },
    onError: () => {
      toast.error("Error deleting user");
    },
  });

  return (
    <div className="space-x-2">
      <Button
        iconName="trash"
        color="red"
        style="secondary"
        disabled={user.id === activeUser?.id || user.role === "owner"}
        onClick={() => setDeleteModalVis(true)}
      ></Button>
      <Button
        iconName="pencil"
        color="blue"
        style="secondary"
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
