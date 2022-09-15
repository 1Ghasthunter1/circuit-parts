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
      <div className="px-4 sm:px-6 lg:px-8 m-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name,
              title, email and role.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button
              iconName="user-plus"
              onClick={() => setShowModal(true)}
              style="bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 text-white"
            >
              New User
            </Button>
          </div>
        </div>
        <UsersTable data={users} />
      </div>
      <NewUserModal
        modalVisibility={showModal}
        setModalVisibility={setShowModal}
      />
    </>
  );
};
export default UsersView;
