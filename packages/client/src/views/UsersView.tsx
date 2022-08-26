import UsersTable from "../components/users/UsersTable";
import { useQuery } from "react-query";
import { fetchAllUsers } from "../services/usersService";
import TopLeftRightAndMiddle from "../layouts/TopLeftRightAndMiddle";
import Button from "../elements/Button";
import CreateModal from "../components/modals/CreateModal";
import { useState } from "react";
const UsersView = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const usersQuery = useQuery("allUsers", () => fetchAllUsers());
  const users = usersQuery.data;

  if (!users) return null;

  const topLeftStuff = <div className="text-4xl font-bold">All Users</div>;

  const topRightStuff = (
    <>
      <Button
        iconName="user"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
        onClick={(_e) => setShowModal(true)}
      >
        New User
      </Button>

      <CreateModal
        title="New User"
        showModal={showModal}
        setShowModal={setShowModal}
        form={<div>XDSDDD</div>}
      />
    </>
  );
  return (
    <TopLeftRightAndMiddle
      topLeftContent={topLeftStuff}
      topRightContent={topRightStuff}
    >
      <UsersTable data={users} />
    </TopLeftRightAndMiddle>
  );
};
export default UsersView;
