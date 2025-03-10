import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import Switch from "./Switch";
import avatar from "../assets/icons/avatar.png";
import { useAuthContext } from "../context/AuthProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { currentUser, logOut } = useAuthContext();
  return (
    <>
      <Disclosure
        as="nav"
        className="bg-neutral-100 dark:bg-gray-900 py-3 dark:text-white fixed w-full top-0 z-20 "
      >
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <Link className="pr-2 text-2xl font-semibold" to="/">
              React Movie app
            </Link>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {currentUser && (
                <h5 className="m-2 capitalize">{currentUser?.displayName}</h5>
              )}

              <Switch />
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={currentUser?.photoURL || avatar}
                      className="size-8 rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  { !currentUser && <>
                  <MenuItem>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Register
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Login
                    </Link>
                  </MenuItem>
                  </>}
                 { currentUser && <MenuItem>
                    <Link
                    onClick={()=> logOut()}
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Sign out
                    </Link>
                  </MenuItem>}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
      <div className="h-[67px]"></div>
    </>
  );
};

export default Navbar;
