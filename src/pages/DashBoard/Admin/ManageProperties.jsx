import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    isPending,
    error,
    data: properties = [],
  } = useQuery({
    queryKey: ["manageProperties", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties`);
      console.log(res.data);
      return res.data;
    },
  });
  const handleVerify = async (id, verificationStatus) => {
    console.log(verificationStatus);
    try {
      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: "Save",
        icon: "success",
      }).then(async (result) => {
        const res = await axiosSecure.patch(`/adminProperties/${id}`, {
          verificationStatus: verificationStatus,
        });
        if (res.data.modifiedCount > 0) {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            refetch();
          }
        }
      });
    } catch (err) {
      console.error("Error verifying property:", err);
    }
  };

  return (
    <div className="mx-auto lg:p-6 container">
      <h2 className="mb-6 font-bold text-2xl">Manage Properties</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Property Title</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Agent Name</th>
              <th className="px-4 py-2">Agent Email</th>
              <th className="px-4 py-2">Price Range</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="border-b">
                <td className="px-4 py-2">{property.title}</td>
                <td className="px-4 py-2">{property.location}</td>
                <td className="px-4 py-2">{property.agent.name}</td>
                <td className="px-4 py-2">{property.agent.email}</td>
                <td className="px-4 py-2">
                  ${property.price.min} - ${property.price.max}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded ${
                      property.verificationStatus === "verified"
                        ? "bg-green-500 text-white"
                        : property.verificationStatus === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {property.verificationStatus || "pending"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {property.verificationStatus === "pending" && (
                    <>
                      <button
                        className="bg-green-500 hover:bg-green-600 mr-2 px-3 py-1 rounded text-white"
                        onClick={() => handleVerify(property._id, "verified")}
                      >
                        Verify
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                        onClick={() => handleVerify(property._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
