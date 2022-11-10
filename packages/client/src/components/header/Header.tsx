import HeaderItem from "./HeaderItem";
import LoginDropdown from "./LoginDropdown";

import { userState } from "../../state/state";
import { useSnapshot } from "valtio";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";

const navigation: { name: string; href: string; roles: UserRole[] }[] = [
  { name: "Dashboard", href: "/dashboard", roles: [] },
  { name: "Projects", href: "/projects", roles: [] },
  { name: "Orders", href: "/orders", roles: [] },
  { name: "Users", href: "/users", roles: ["admin", "owner"] },
];

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserRole } from "~/types/universalTypes";
const Header = () => {
  const user = useSnapshot(userState).user;
  const navigate = useNavigate();
  const currentUrl = useLocation().pathname;

  const comparePathway = (compareTo: string) => {
    return currentUrl.startsWith(compareTo);
  };

  if (!user) return null;
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FontAwesomeIcon className="block h-6 w-6" icon="x" />
                  ) : (
                    <FontAwesomeIcon className="block h-6 w-6" icon="bars" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center cursor-pointer">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/icon.svg"
                    onClick={() => navigate("/projects")}
                  />
                  <img
                    className="hidden h-8 w-auto lg:block cursor-pointer"
                    src="/icon.svg"
                    onClick={() => navigate("/projects")}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block select-none">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      if (item.roles.length !== 0) {
                        if (!item.roles.includes(user.role)) return null;
                      }
                      return (
                        <div
                          onClick={() => navigate(item.href)}
                          key={item.name}
                          className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                            comparePathway(item.href)
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <LoginDropdown />
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full ${
                    comparePathway(item.href)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <div className="flex justify-left">{item.name}</div>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
