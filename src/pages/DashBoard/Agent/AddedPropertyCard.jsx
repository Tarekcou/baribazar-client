import React from "react";
import { FaEdit, FaRemoveFormat } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const AddedPropertyCard = ({ property, handleDelete }) => {
  console.log(property);
  const axiosSecure = useAxiosSecure();

  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      {/* Property Image */}
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-48 object-cover"
      />

      {/* Property Info */}
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-800 text-lg">{property.title}</h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              property.verificationStatus === "pending"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {property.verificationStatus}
          </span>
        </div>

        <p className="text-gray-600 text-sm">{property.location}</p>

        {/* Agent Details */}
        <div className="flex items-center mt-2">
          <img
            src={property.agent.image}
            alt={property.agent.name}
            className="border-2 border-gray-300 rounded-full w-10 h-10 object-cover"
          />
          <div className="ml-3">
            <p className="font-medium text-sm">{property.agent.name}</p>
            <p className="font-medium text-xs">{property.agent.role}</p>
            {/* <p
              className={`text-xs ${
                property.verificationStatus ? "text-green-500" : "text-red-500"
              }`}
            >
              {property.verificationStatus ? "Verified" : "Not Verified"}
            </p> */}
          </div>
        </div>

        {/* Price & Status */}
        <div className="flex justify-between items-end my-4 w-full">
          <p className="font-semibold text-blue-500 text-sm">
            Min Price: ${property.price.min}
          </p>
          <p className="font-semibold text-blue-500 text-end text-sm">
            Max Price: ${property.price.max}
          </p>
        </div>

        {/* Update Delete Button */}
        <div className="flex">
          {property.verificationStatus === "rejected" ? (
            <></>
          ) : (
            <Link
              to={`/dashboard/updateProperty`}
              state={property}
              className="bg-green-500 hover:bg-green-600 mt-4 text-sm text-white transition btn btn-sm"
            >
              <FaEdit />
              Update
            </Link>
          )}

          <button
            onClick={() => handleDelete(property?._id)}
            className="bg-red-500 hover:bg-red-600 mt-4 text-sm text-white transition btn btn-sm"
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddedPropertyCard;
