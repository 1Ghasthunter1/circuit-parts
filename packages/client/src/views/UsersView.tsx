import UsersTable from "../components/users/UsersTable";
import { useQuery } from "react-query";
import { fetchAllUsers } from "../services/usersService";
import NewUserModal from "~/components/modals/NewUserModal";
import { useState } from "react";
import Button from "~/elements/Button";

const UsersView = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const usersQuery = useQuery("allUsers", () => fetchAllUsers());
  const users = usersQuery.data;

  if (!users) return null;

  const topLeftStuff = <div className="text-4xl font-bold">All Users</div>;

  return (
    <>
      <div className="flex items-center">
        <div className="flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in the 696 PMS workspace.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            iconName="user-plus"
            color="green"
            onClick={() => setShowModal(true)}
          >
            New User
          </Button>
        </div>
      </div>
      <UsersTable data={users} />
      <NewUserModal
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </>
  );
};
export default UsersView;
