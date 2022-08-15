import { Link } from "react-router-dom";

interface HeaderItemProps {
  children: string;
  url: string;
}
const HeaderItem = ({ children, url }: HeaderItemProps) => {
  return (
    <Link to={url} className="text-blue-500 hover:text-blue-800">
      {children}
    </Link>
  );
};

export default HeaderItem;
