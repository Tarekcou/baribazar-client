import React from "react";
import best1 from "../../assets/best1.jpg";
import best2 from "../../assets/best2.jpg";
import best3 from "../../assets/best3.jpg";
const BestHouse = () => {
  return (
    <div className="space-y-4 mx-auto w-11/12 md:w-10/12 lg:w-9/12 h-auto text-center">
      <div className="gap-3 grid grid-cols-1 md:grid-cols-3">
        <div className="max-h-[250px]">
          <img className="w-full h-full object-cover" src={best1} alt="best1" />
        </div>
        <div className="max-h-[250px]">
          <img className="w-full h-full object-cover" src={best2} alt="best2" />
        </div>
        <div className="max-h-[250px]">
          <img className="w-full h-full object-cover" src={best3} alt="best3" />
        </div>
      </div>
    </div>
  );
};

export default BestHouse;
