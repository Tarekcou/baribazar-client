import React from "react";
import one from "../../assets/1.png";
import two from "../../assets/2.png";
import three from "../../assets/3.png";
import four from "../../assets/4.png";
const Company = () => {
  return (
    <div className="">
      <div className="flex justify-between mx-auto w-9/12">
        <img className="w-24 h-20 cursor-pointer" src={one} alt="" />
        <img className="w-24 h-20 cursor-pointer" src={two} alt="" />
        <img className="w-24 h-20 cursor-pointer" src={three} alt="" />
        <img className="w-24 h-20 cursor-pointer" src={four} alt="" />
        <img className="w-24 h-20 cursor-pointer" src={two} alt="" />
      </div>
    </div>
  );
};

export default Company;
