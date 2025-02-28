import React from "react";
import { FaUser } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { LuTableProperties } from "react-icons/lu";
import { MdReviews } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="space-y-2 text-xs">
      <Link
        to={"/dashboard"}
        className="flex justify-center bg-blue-800 my-5 p-5 border border-none rounded-sm w-full font-bold text-white text-2xl text-center"
      >
        Admin
      </Link>
      <NavLink className={"btn border-none w-full"} to="/dashboard/allUsers">
        <GrUserManager />
        Manage Users
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/manageProperties"
      >
        <LuTableProperties />
        Manage Properties
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/manageReviews"
      >
        <MdReviews />
        Manage Reviews
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/advertiseProperties"
      >
        <MdReviews />
        Advertise property
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/adminProfile"
      >
        <FaUser />
        Admin Profile
      </NavLink>
    </div>
  );
};

export default AdminMenu;
