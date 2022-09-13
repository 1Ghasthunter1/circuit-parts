type Sizes = "sm" | "md" | "lg" | "xl" | "full";

const UserIcon = ({ text, size }: { text?: string; size?: Sizes }) => {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-14 w-14",
    full: "h-24 w-24",
  };
  return (
    <span
      className={`inline-flex ${
        sizeMap[size || "sm"]
      } items-center justify-center rounded-full bg-gray-500`}
    >
      <span className="font-medium leading-none text-white">{text || ""}</span>
    </span>
  );
};

export default UserIcon;
