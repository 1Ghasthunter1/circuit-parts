import UsersTable from "../components/users/UsersTable";
import { useQuery } from "react-query";
import { fetchAllUsers } from "../services/usersService";
import TopLeftRightAndMiddle from "../layouts/TopLeftRightAndMiddle";
import NewUser from "../components/users/NewUser";

const UsersView = () => {
  const usersQuery = useQuery("allUsers", () => fetchAllUsers());
  const users = usersQuery.data;

  if (!users) return null;

  const topLeftStuff = <div className="text-4xl font-bold">All Users</div>;

  return (
    <TopLeftRightAndMiddle
      topLeftContent={topLeftStuff}
      topRightContent={<NewUser />}
    >
      <UsersTable data={users} />
    </TopLeftRightAndMiddle>
  );
};
export default UsersView;
