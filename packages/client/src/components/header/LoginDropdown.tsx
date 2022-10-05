import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { userState } from "~/state/state";
import { useSnapshot } from "valtio";
import { useNavigate } from "react-router-dom";
import UserIcon from "../users/UserIcon";
import { logout } from "~/utils/authorization";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const LoginDropdown = () => {
  const navigate = useNavigate();
  const user = useSnapshot(userState).user;
  if (!user) return null;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex">
        <div className="flex items-center">
          <UserIcon
            text={
              user.firstName.charAt(0).toUpperCase() +
              user.lastName.charAt(0).toUpperCase()
            }
            size="md"
          />
          <div className="ml-3 group flex flex-col justify-left">
            <p className="text-sm font-medium text-gray-300">
              {user.firstName} {user.lastName}
            </p>
            <div className="flex content-center text-xs font-medium text-gray-100 group-hover:text-gray-300">
              <div className="mr-1">View profile</div>
              <div>
                <FontAwesomeIcon icon="caret-down" size="xs" />
              </div>
            </div>
          </div>
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-40 shadow-lg origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => navigate(`/account`)}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 cursor-pointer"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 w-full flex"
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="submit"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 w-full flex"
                  )}
                  onClick={() => logout()}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LoginDropdown;
