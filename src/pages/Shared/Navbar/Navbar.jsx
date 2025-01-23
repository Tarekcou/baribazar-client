import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

import BariBazar from "../../../assets/BariBazar.png";
import { AuthContext } from "../../../provider/AuthProvider";
import ThemeProvider from "../../../provider/ThemeProvider";
import useWishList from "../../../hooks/useWishList";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut, imageKey, cart, setTheme } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  const { theme, toggleTheme, isDark } = ThemeProvider();
  const [wishlist] = useWishList();
  const location=useLocation();
  const isDashboard = location.pathname === "/dashboard";

  const handleLogOut = () => {
    logOut();
  };

  const signInSignOutToggle = (
    <>
      {user ? (
        <div className="flex justify-between items-center gap-2 w-full">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-pointer"
          >
            <div role="button" className="avatar btn btn-circle btn-ghost">
              <div className="rounded-full w-10">
                <img
                  key={imageKey}
                  src={
                    user.photoURL ||
                    "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316631.1.png"
                  }
                  alt="Tailwind CSS Navbar component"
                />
              </div>
            </div>

            {/* Overlay Name */}
            <div
              className={`absolute w-[200px] h-[50px] text-center z-10 md:-right-10 -right-30  top-16 flex items-center justify-center
           bg-black bg-opacity-50 text-white text-lg font-semibold rounded-lg transition-opacity ${
             isHovered ? "opacity-200" : "opacity-0"
           }`}
            >
              {user?.displayName}
            </div>
          </div>

          <button
            onClick={handleLogOut}
            className="my-5 rounded-xl font-medium text-sm text-white-700 hover:text-blue-600 btn btn-sm btn-warning"
          >
            LogOut
          </button>
        </div>
      ) : (
        // If no user is logged in

        <div className="flex justify-center items-center">
          <div>
            <FaUserAlt className="text-white text-xl" />
          </div>
          <NavLink
            to="/login"
            className="bg-[#70b100] mx-3 border-none rounded-md font-medium text-sm text-white hover:text-blue-600 btn btn-sm"
          >
            Login
          </NavLink>
        </div>
      )}
    </>
  );
  const navMenu = (
    <div className="flex lg:flex-row flex-col justify-center gap-2 text-white">
      <NavLink to="/" className="border-none text-white btn btn-outline btn-sm">
        Home
      </NavLink>

      {user ? (
        <div className="flex lg:flex-row flex-col gap-2">
          <NavLink
            to="/all-properties"
            className="border-none text-white btn btn-outline btn-sm"
          >
            All Properties
          </NavLink>
          <NavLink
            to="/dashboard"
            className="border-none text-white btn btn-outline btn-sm"
          >
            Dashboard
          </NavLink>
        </div>
      ) : (
        ""
      )}
      <NavLink
        to={`/contact`}
        className="border-none text-white btn btn-outline btn-sm"
      >
        Contact
      </NavLink>
      <NavLink
        to={`/aboutus`}
        className="border-none text-white btn btn-outline btn-sm"
      >
        AboutUs
      </NavLink>
      <NavLink
        to={"/dashboard"}
        className="flex items-center mx-2 btn btn-outline btn-sm"
      >
        <FaCartPlus className="text-white text-xl" />
        <div className="bg-green-700 border-none text-white badge">
          +{wishlist.length}
        </div>
      </NavLink>
    </div>
  );
  if(isDashboard)
    return
  return (
    <>
      <div className="bg-black py-2 text-white">
        <div className="flex justify-between items-center mx-auto w-11/12 md:w-10/12 lg:w-9/12">
          {/* left side */}
          <div className="flex justify-center items-center">
            <div className="block lg:!hidden dropdown">
              <div
                tabIndex={0}
                role="button"
                className="text-orange-500 btn btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="z-20 bg-black/80 shadow mt-3 p-2 rounded-box w-52 dropdown-content menu menu-sm"
              >
                {navMenu}
                {signInSignOutToggle}
              </ul>
            </div>
            <Link
              to={"/"}
              className="flex items-center gap-1 font-bold text-center text-orange-500 text-xl"
            >
              <img className="rounded-full w-10 h-10" src={BariBazar} />{" "}
              BariBazar
            </Link>
          </div>
          {/* middle area */}

          <div className="lg:!block !hidden">
            <ul className="w-full">{navMenu}</ul>
          </div>
          {/* right side */}
          <div className="flex justify-center items-center gap-2">
            <div className="md:!block hidden">{signInSignOutToggle}</div>
            {/* <Link to={"/main/checkOut"} className="relative">
            <p className="-top-2 -right-2 absolute font-bold text-yellow-500">
              {cart.length}{" "}
            </p>
            <FaCartPlus className="text-3xl text-green-500" />
          </Link> */}
            {/* Theme Control */}
            <label className="swap-rotate btn btn-circle btn-ghost swap">
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
                checked={isDark}
                onChange={toggleTheme} // Sync with React state
              />

              {/* sun icon */}
              <svg
                className="swap-off w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
