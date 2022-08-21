import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonPropsTypes {
  iconName?: IconProp;
  bgColor?: string;
  txtColor?: string;
  hoverColor?: string;
  children?: string;
  style?: string;
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
  onClick,
}: ButtonPropsTypes) => {
  return (
    <button
      className={`text-sm text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ${
        bgColor ? bgColor : "bg-gray-300"
      } ${txtColor ? txtColor : "text-black"} ${
        hoverColor ? hoverColor : "hover:bg-pink-300"
      } ${style || ""}`}
      onClick={onClick}
    >
      {iconName && <FontAwesomeIcon icon={iconName} className="pr-2" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
