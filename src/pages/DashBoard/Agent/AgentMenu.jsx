import React from "react";
import { FaUser } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { LuTableProperties } from "react-icons/lu";
import { MdReviews } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import { MdSell } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";

const AgentMenu = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link
        to={"/dashboard"}
        className="flex justify-center bg-blue-200 my-5 p-5 border w-full font-bold text-2xl text-center"
      >
        Agent
      </Link>{" "}
      <NavLink className={"btn border-none w-full"} to="/dashboard/addProperty">
        <MdOutlinePostAdd />
        Add Property
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/addedProperties"
      >
        <LuTableProperties />
        Added Properties
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/soldProperties"
      >
        <MdSell />
        Sold Properties
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/soldPropertiesAmount"
      >
        <MdSell />
        Sold Amount
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/requestedProperties"
      >
        <VscGitPullRequestGoToChanges />
        Req. Properties
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/agentProfile"
      >
        <FaUser />
        Agent Profile
      </NavLink>
    </div>
  );
};

export default AgentMenu;
