interface StatusProps {
  color: "red" | "blue" | "green" | "orange" | "yellow" | "violet";
  children?: string;
}

const AttributeBox = ({ color, children }: StatusProps) => {
  let colorStyle;
  switch (color) {
    case "red":
      colorStyle = "bg-red-100 text-red-500";
      break;
    case "blue":
      colorStyle = "bg-blue-100 text-blue-500";
      break;
    case "violet":
      colorStyle = "bg-violet-100 text-violet-500";
      break;
    default:
      colorStyle = "bg-red-200";
  }
  return (
    <div
      className={`whitespace-nowrap w-min px-2 py-1 rounded-md font-bold ${colorStyle}`}
    >
      {children}
    </div>
  );
};

export default AttributeBox;
