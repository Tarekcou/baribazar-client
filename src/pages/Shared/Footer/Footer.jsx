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
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  if (isDashboard) return;
  return (
    <footer className="relative bg-black py-10 text-white">
      <div className="mx-auto mb-6 w-full lg:w-10/12">
        <div className="flex lg:flex-row flex-col mx-auto px-6 md:px-12 container">
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
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="/" className="hover:text-gray-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/aboutus" className="hover:text-gray-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/login " className="hover:text-gray-400">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer Right - Map */}
          <div className="">
            <h3 className="mb-4 font-semibold text-xl">Find Us On</h3>
            <div className="mapouter">
              <div className="w-full h-[300px] overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://maps.google.com/maps?width=200&amp;height=200&amp;hl=en&amp;q=Chittagong&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  style={{ border: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="bottom-0 z-10 absolute my-3 w-full text-gray-400 text-center">
        <div class="w-full divider divider-neutral"></div>

        <p>&copy; 2025 RealEstate Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
