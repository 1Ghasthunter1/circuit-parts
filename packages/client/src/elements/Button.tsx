import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type colorsObject = { [key: string]: { primary: string; secondary: string } };

interface ButtonPropsTypes {
  children?: JSX.Element | string;
  style?: "primary" | "secondary";
  customStyle?: string;
  color?: "red" | "blue" | "green";
  size?: "sm" | "md" | "lg";
  iconName?: IconProp;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Button = ({
  children,
  style,
  customStyle,
  color,
  size,
  iconName,
  type,
  disabled,
  isLoading,
  onClick,
}: ButtonPropsTypes) => {
  const colors: colorsObject = {
    red: {
      primary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      secondary: "bg-red-200 text-red-600 hover:bg-red-300 focus:ring-red-400",
    },
    green: {
      primary:
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      secondary:
        "bg-green-200 text-green-600 hover:bg-green-200 focus:ring-green-400",
    },
    blue: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-blue-200 text-blue-600 hover:bg-blue-300 focus:ring-blue-400",
    },
    default: {
      primary:
        "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
      secondary:
        "bg-indigo-200 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-400",
    },
  };
  const getStyle = () => {
    switch (style) {
      case "primary":
        if (color) return colors[color].primary;
        return colors.default.primary;
      case "secondary":
        if (color) return colors[color].secondary;
        return colors.default.secondary;
      default:
        if (color) return colors[color].primary;
        return colors.default.primary;
    }
  };

  const getSize = () => {
    switch (size) {
      case "sm":
        return "px-2 py-1.5 text-xs";
      case "md":
        return "px-3 py-2 text-sm ";
      case "lg":
        return "px-4 py-3 text-md";
      default:
        return "px-3 py-2 text-sm ";
    }
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type || "button"}
      className={`transition duration-50 inline-flex items-center rounded-md border border-transparent font-medium leading-4 ${getSize()} shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-inherit ${getStyle()} ${
        customStyle || ""
      } disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed ${
        isLoading && "cursor-not-allowed"
      }`}
    >
      <div className="flex items-center">
        {!isLoading && iconName && <FontAwesomeIcon icon={iconName} />}
        {isLoading && (
          <div className="animate-spin">
            <FontAwesomeIcon icon="circle-notch" />
          </div>
        )}
        <span className={children && iconName && "w-2"}></span>
        <span>{children || ""}</span>
      </div>
    </button>
  );
};

export default Button;
