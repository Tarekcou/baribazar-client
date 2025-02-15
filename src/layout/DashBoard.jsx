import React, { useContext, useEffect, useState } from "react";
import {
  FaBuyNLarge,
  FaCartArrowDown,
  FaCartPlus,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { LuTableProperties } from "react-icons/lu";
import { MdReviews } from "react-icons/md";

import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import useWishList from "../hooks/useWishList";
import ThemeProvider from "../provider/ThemeProvider";
import useAdmin from "../hooks/useAdmin";
import useAgent from "../hooks/useAgent";
import AdminMenu from "../pages/DashBoard/Admin/AdminMenu";
import AgentMenu from "../pages/DashBoard/Agent/AgentMenu";
import UserMenu from "../pages/DashBoard/User/UserMenu";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const DashBoard = () => {
  const [wishlist] = useWishList();
  const { theme, toggleTheme, isDark } = ThemeProvider();
  const [isAdmin] = useAdmin();
  const {isLoading}=useContext(AuthContext)
  // const isAdmin = false;
  const [isAgent] = useAgent();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if(isLoading) return <Loading />
  return (
    <div className="relative flex gap-10">
      <div className="fixed top-0 left-0 overflow-y-auto flex flex-col items-center gap-3 bg-primary/70  p-2 lg:p-10 w-36 lg:w-64 min-h-screen">
        {/* Theme Control */}
        <label className="swap-rotate text-center btn btn-circle btn-ghost swap">
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
        <ul className="flex flex-col gap-3">
          {isAdmin ? (
            <>
              <AdminMenu />
            </>
          ) : isAgent ? (
            <>
              <AgentMenu />
            </>
          ) : (
            <>
              <UserMenu wishlist={wishlist} />
            </>
          )}
          <div className="divider"></div>

          {/* Home Front SIde */}
          <NavLink to="/" className="border-none btn">
            Home
          </NavLink>

          <NavLink to="/all-properties" className="border-none btn">
            All Properties
          </NavLink>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-36 lg:ml-64  w-full flex-1  relative">
        <div 
className={`fixed top-0 w-full z-10 px-6 py-4 transition-all  duration-300 ${
  scrolled
    ? "backdrop-blur-lg bg-primary/70 shadow-md"
    : " bg-primary/70"
}`}        >       
           <h1 className=" text-3xl font-bold text-center"> Welcome to Dashboard</h1>
        </div>     
        <div className="p-5 mt-20">
        <Outlet />
        </div>
        
      </div>
    </div>
  );
};

export default DashBoard;
