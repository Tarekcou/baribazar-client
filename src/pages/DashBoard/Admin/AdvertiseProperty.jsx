import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Swal from "sweetalert2";
const AdvertiseProperty = () => {
  //   const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Fetch verified properties
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    isPending,
    error,
    data: properties = [],
  } = useQuery({
    queryKey: ["managePropertiesVerified", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties`, {
        params: { verificationStatus: "verified" },
      });
      console.log(res.data);
      return res.data;
    },
  });

  // Handle Advertise button
  const handleAdvertise = (advertisedProperty, id) => {
    Swal.fire({
      title: "Do you want to add to Advertisement?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post(
          `/advertisement`,
          advertisedProperty
        );
        console.log(res.data);
        const res2 = await axiosSecure.patch(`/adminProperties/${id}`, {
          params: { advertised: true },
        });
        if (res.insertedId) {
          Swal.fire("Added to server!", "", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 font-bold text-2xl">Advertise Property</h1>
      {properties.length === 0 ? (
        <p className="text-gray-600">
          No verified properties available for advertising.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="border border-gray-200 min-w-full">
            <thead className="">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Price(Min)</th>
                <th className="px-4 py-2 border">Price(Max)</th>
                <th className="px-4 py-2 border">Agent Name</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id} className="hover:bg-gray-800">
                  <td className="px-4 py-2 border">
                    <img
                      src={property?.images[0]}
                      alt={property.title}
                      className="rounded w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border">{property.title}</td>
                  <td className="px-4 py-2 border">{property.price.max}</td>
                  <td className="px-4 py-2 border">{property.price.min}</td>
                  <td className="px-4 py-2 border">{property.agent.name}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      disabled={property?.advertised}
                      className={`px-4 py-2 rounded text-white ${
                        property?.advertised
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={() => handleAdvertise(property, property._id)}
                    >
                      {property?.advertised ? "Advertised" : "Advertise"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdvertiseProperty;
