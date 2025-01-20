import React from "react";
import { FaUser } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { LuTableProperties } from "react-icons/lu";
import { MdReviews } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="">
      <h1 className="bg-blue-200 mb-5 py-2 border font-bold text-center">
        Admin
      </h1>
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
        to="/dashboard/adminProfile"
      >
        <FaUser />
        Admin Profile
      </NavLink>
    </div>
  );
};

export default AdminMenu;
