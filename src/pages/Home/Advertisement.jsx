import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../assets/best1.jpg";
import img2 from "../../assets/best2.jpg";
import img3 from "../../assets/best3.jpg";
import broker1 from "../../assets/broker1.jpg";
import broker2 from "../../assets/broker2.jpg";
import broker3 from "../../assets/broker3.jpg";
import PropertyCard from "../AllProperties/PropertyCard";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Advertisement = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/advertisement").then((response) => {
      // console.log(response.data);
      setProperties(response.data);
    });
  }, []);
  // console.log(properties);
  // Example data for properties

  const [filter, setFilter] = useState("All");

  // Filtered properties based on the selected filter
  const filteredProperties =
    filter === "All"
      ? properties
      : properties.filter((property) => property.status === filter);
  const handleFilterChange = (status) => {
    setFilter(status);
    // setCurrentPage(0); // Reset to the first page when changing filter
  };

  if(properties.length===0)return <h1 className="text-3xl text-center my-5 text-red-400">Nothing Being Advertised...</h1>
  return (
    <section className="mx-auto md:w-10/12 lg:w-8/12 w-11/12">
      <div className="mx-auto">
        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          {["All", "For Sale", "For Rent"].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        {/* Property Grid */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
