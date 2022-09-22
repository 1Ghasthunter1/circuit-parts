import { footerState } from "~/state/state";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-white h-24">
      <div className="mx-auto max-w-7xl overflow-hidden py-4 px-4">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {footerState.links.map((link) => (
            <div key={uuidv4()} onClick={link.onClick} className="px-5 py-2">
              <Link to={link.url}>
                <p className="text-base text-gray-500 hover:text-gray-900">
                  {link.text}
                </p>
              </Link>
            </div>
          ))}
        </nav>

        <p className="mt-4 text-center text-base text-gray-400">
          Circuit Parts 2022
        </p>
      </div>
    </footer>
  );
};
export default Footer;
