interface StatusProps {
  type: "assembly" | "part";
}

const TypeBox = ({ type }: StatusProps) => {
  let content;
  let color;
  switch (type) {
    case "assembly":
      content = "Assembly";
      color = "bg-green-100 text-green-500";
      break;
    case "part":
      content = "Part";
      color = "bg-blue-100 text-blue-500";
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

export default TypeBox;
