import React from "react";
import contactBg from "../../assets/contactbg.jpg";
const ContactUs = () => {
  return (
    <div className="relative w-full">
      <img
        src={contactBg}
        alt="Responsive Example"
        className="w-full h-[50vh] object-cover"
      />
      <div className="top-1/2 z-20 absolute w-full text-white">
        <div className="flex justify-between items-center gap-10 mx-auto w-8/12">
          <div>
            <h1 className="font-bold text-3xl">Find Best Place For Living</h1>
            <p className="w-8/12">
              Spend vacations in best hotels and resorts find the great place of
              your choice using different searching options.
            </p>
          </div>
          <button className="btn btn-accent">Contact Us</button>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
};

export default ContactUs;
