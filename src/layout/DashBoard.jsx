import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useWishList from "../hooks/useWishList";
import ThemeProvider from "../provider/ThemeProvider";
import useAdmin from "../hooks/useAdmin";
import useAgent from "../hooks/useAgent";
import AdminMenu from "../pages/DashBoard/Admin/AdminMenu";
import AgentMenu from "../pages/DashBoard/Agent/AgentMenu";
import UserMenu from "../pages/DashBoard/User/UserMenu";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import DashboardOverview from "./DashboardOverview";

const DashBoard = () => {
  const [wishlist] = useWishList();
  const { theme, toggleTheme, isDark } = ThemeProvider();
  const [isAdmin] = useAdmin();
  const { isLoading } = useContext(AuthContext);
  const [isAgent] = useAgent();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <Loading />;
  console.log("dark", isDark);
  return (
    <div className="flex">
      {/* Drawer for Mobile */}
      <div className="lg:hidden top-0 left-0 z-50 fixed w-full">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Open Drawer Button */}
          <label
            htmlFor="dashboard-drawer"
            className="z-20 m-4 mt-2 btn btn-ghost"
          >
            <FaBars className="w-6 h-6" />
          </label>
        </div>
        <div className="top-0 left-0 z-[60] fixed w-full h-full drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="z-50 p-4 w-64 text-white menu">
            <SidebarContent
              isAdmin={isAdmin}
              isAgent={isAgent}
              wishlist={wishlist}
              toggleTheme={toggleTheme}
              isDark={isDark}
            />
          </ul>
        </div>
      </div>

      {/* Left Sidebar for Large Screens */}
      <div
        className={`hidden fixed lg:flex flex-col  p-6 w-64 h-screen overflow-y-auto 
          ${isDark ? "bg-gray-900" : "bg-slate-100"}
          `}
      >
        <SidebarContent
          isAdmin={isAdmin}
          isAgent={isAgent}
          wishlist={wishlist}
          toggleTheme={toggleTheme}
          isDark={isDark}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex-1 m-2 lg:ml-64 w-full min-w-0 h-screen overflow-y-auto">
        {/* Top Navbar */}
        <div
          className={`${
            isDark ? "bg-gray-900" : "bg-slate-100"
          }   w-full fixed top-0 lg:left-60 right-0 z-10 px-6 py-4 transition-all duration-300 ${
            scrolled ? "backdrop-blur-lg  shadow-md" : ""
          }`}
        >
          <h1 className="overflow-hidden font-bold text-3xl text-center">
            Welcome to Dashboard
          </h1>
        </div>

        {isDashboard && (
          <div>
            <DashboardOverview />
          </div>
        )}

        {/* Page Content */}
        <div className="mt-20 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Sidebar Content Component
const SidebarContent = ({
  isAdmin,
  isAgent,
  wishlist,
  toggleTheme,
  isDark,
}) => {
  return (
    <>
      {/* Theme Toggle */}
      <label className="mx-auto mt-10 swap-rotate swap btn btn-circle btn-ghost">
        <input
          type="checkbox"
          className="theme-controller"
          checked={isDark}
          onChange={toggleTheme}
        />
        {/* Sun Icon */}
        <svg
          className="fill-current swap-off w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        {/* Moon Icon */}
        <svg
          className="fill-current swap-on w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>

      {/* User-Specific Menu */}
      {isAdmin ? (
        <AdminMenu />
      ) : isAgent ? (
        <AgentMenu />
      ) : (
        <UserMenu wishlist={wishlist} />
      )}

      <div className="divider"></div>
      <div className="space-y-2 w-full">
        {/* Home Links */}
        <NavLink to="/" className="w-full btn">
          Home
        </NavLink>
        <NavLink to="/all-properties" className="w-full btn">
          All Properties
        </NavLink>
      </div>
    </>
  );
};

export default DashBoard;
