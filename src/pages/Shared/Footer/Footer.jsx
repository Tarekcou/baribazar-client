import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import logo from "../../../assets/logo2.png";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const center = {
    lat: 40.7128, // Example location (New York City)
    lng: -74.006,
  };
  const location=useLocation()
  const isDashboard = location.pathname === "/dashboard";
  if(isDashboard) return;
  return (
    <footer className="bg-black py-12 text-white">
      <div className="mx-auto w-full lg:w-10/12">
        <div className="flex flex-col lg:flex-row mx-auto px-6 md:px-12 container">
          <div className="items-center gap-12 grid grid-cols-1 md:grid-cols-2">
            {/* Footer Left - Company Info */}
            <div>
              <h2 className="flex gap-2 mb-4 font-bold text-3xl">
                <img className="rounded-full w-10 h-10" src={logo} />
                Bari Bazar.
              </h2>
              <p className="mb-4">
                Your trusted partner in real estate. We help you find your dream
                home.
              </p>
              <p className="mb-4 underline">Phone: +88 01818424256</p>
              <p className="mb-4">Email: contact@baribazar.com</p>
            </div>

            {/* Footer Middle - Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold text-xl">Quick Links</h3>
              <ul>
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#properties"
                    className="text-gray-400 hover:text-white"
                  >
                    Properties
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer Right - Map */}
          <div className="w-[200px]">
            <h3 className="mb-4 font-semibold text-xl">Find Us On</h3>
            <div className="mapouter">
              <div className="gmap_canvas w-10/12">
                <iframe
                  className="gmap_iframe"
                 
                  src="https://maps.google.com/maps?width=300&amp;height=400&amp;hl=en&amp;q=Chittagong&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="mt-12 text-center text-gray-400">
          <p>&copy; 2025 RealEstate Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
