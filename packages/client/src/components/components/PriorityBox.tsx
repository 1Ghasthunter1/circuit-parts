import { Priority } from "~/types/universalTypes";

interface StatusProps {
  priority: Priority;
}

const PriorityBox = ({ priority }: StatusProps) => {
  let content;
  let color;
  switch (priority) {
    case "low":
      content = "Low";
      color = "bg-purple-100 text-purple-500";
      break;
    case "normal":
      content = "Normal";
      color = "bg-blue-100 text-blue-500";
      break;
    case "high":
      content = "High";
      color = "bg-orange-100 text-orange-500";
      break;
    case "urgent":
      content = "Urgent";
      color = "bg-red-100 text-red-500";
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

export default PriorityBox;
