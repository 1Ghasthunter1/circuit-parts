import { UserRole } from "~/types/universalTypes";

interface StatusProps {
  role: UserRole;
}

const RoleBox = ({ role }: StatusProps) => {
  let content;
  let color;
  switch (role) {
    case "user":
      content = "User";
      color = "bg-purple-100 text-purple-500";
      break;
    case "admin":
      content = "Admin";
      color = "bg-red-100 text-red-500";
      break;
    case "owner":
      content = "Owner";
      color = "bg-gray-200 text-gray-500";
      break;
    default:
      content = "Unknown";
      color = "bg-red-200";
  }
  return (
    <div
      className={`whitespace-nowrap w-min px-2 py-1 rounded-md font-bold ${color}`}
    >
      {content}
    </div>
  );
};

export default RoleBox;
