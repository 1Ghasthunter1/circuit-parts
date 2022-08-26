import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonPropsTypes {
  iconName?: IconProp;
  bgColor?: string;
  txtColor?: string;
  hoverColor?: string;
  children?: string;
  style?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Button = ({
  iconName,
  bgColor,
  txtColor,
  hoverColor,
  children,
  style,
  className,
  disabled,
  type,
  onClick,
}: ButtonPropsTypes) => {
  return (
    <button
      type={type}
      className={`text-sm text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center disabled:bg-gray-200 ${
        bgColor ? bgColor : "bg-gray-300"
      } ${txtColor ? txtColor : "text-black"} ${
        hoverColor ? hoverColor : "hover:bg-pink-300"
      } ${style || ""} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconName && <FontAwesomeIcon icon={iconName} className="pr-2" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
