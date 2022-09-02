const CustomBox = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  return (
    <div
      className={`whitespace-nowrap w-min px-2 py-1 rounded-md font-bold ${
        className || "bg-blue-100 text-blue-500"
      }`}
    >
      {text}
    </div>
  );
};

export default CustomBox;
