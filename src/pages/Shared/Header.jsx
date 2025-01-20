import React from "react";

const Header = ({ heading, title }) => {
  return (
    <div className="space-y-2 mx-auto pt-5 w-8/12 text-center">
      <h2 className="text-[#70b100] text-xs">{title}</h2>
      <h1 className="font-bold text-3xl">{heading}</h1>
      <div className="mx-auto w-20 divider divider-success"></div>
    </div>
  );
};

export default Header;
