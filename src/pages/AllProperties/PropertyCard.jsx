import React from "react";
import img1 from "../../assets/best1.jpg";
import img2 from "../../assets/best2.jpg";
import img3 from "../../assets/best3.jpg";
import broker1 from "../../assets/broker1.jpg";
import broker2 from "../../assets/broker2.jpg";
import broker3 from "../../assets/broker3.jpg";
import { Link } from "react-router-dom";
const PropertyCard = ({ property }) => {
  // console.log(property);

  return (
    <div className="relative shadow-md rounded-lg overflow-hidden">
      {/* Property Image */}
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-48 object-cover"
      />

      {/* Property Info */}
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg">{property.title}</h3>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              property.status === "For Sale"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {property.status}
          </span>
        </div>

        <p className="text-sm">{property.location}</p>

        {/* agent? Details */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex">
            <img
              src={property.agent?.image}
              alt={property.agent?.name}
              className="border-2 border-gray-300 rounded-full w-10 h-10 object-cover"
            />
            <div className="ml-3">
              <p className="font-medium text-sm">{property.agent?.name}</p>
              <p className="font-medium text-xs">{property.agent?.role}</p>
            </div>
          </div>
        </div>

        {/* Price & Status */}
        <div className="flex justify-between items-end my-4 w-full">
          <p className="font-semibold text-blue-500 text-sm">
            Min Price: ${property.price.min}
          </p>
          <p className="font-semibold text-blue-500 text-sm text-end">
            Max Price: ${property.price.max}
          </p>
        </div>

        {/* Details Button */}
        <Link
          to={`/property/${property._id}`}
          state={property}
          className="bg-green-500 hover:bg-green-600 mt-4 text-white text-sm transition btn btn-sm"
        >
          View Details
        </Link>
      </div>

      {/* verifcaiton status */}
      <div className="top-1 right-0 z-10 absolute font-semibold badge">
        <p
          className={`text-xs ${
            property.verificationStatus ? "text-green-500" : "text-red-500"
          }`}
        >
          {property.verificationStatus ? "Verified" : "Not Verified"}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
