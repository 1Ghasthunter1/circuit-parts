type Sizes = "sm" | "md" | "lg" | "xl" | "full";

const UserIcon = ({ text, size }: { text?: string; size?: Sizes }) => {
  const normal = false;
  const sizeMap = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-md",
    lg: "h-12 w-12",
    xl: "h-14 w-14",
    full: "h-24 w-24 text-4xl",
  };
  if (normal)
    return (
      <span
        className={`inline-flex ${
          sizeMap[size || "sm"]
        } items-center justify-center rounded-full bg-gray-500`}
      >
        <span className="font-medium leading-none text-white">
          {text || ""}
        </span>
      </span>
    );

  return (
    <div className="flex shrink-0 h-10 w-10">
      <img
        className="rounded-full ring-white ring-4"
        src="/upClose.jpg"
        alt=""
      />
    </div>
  );
};

export default UserIcon;
