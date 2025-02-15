import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const SoldProperties = () => {

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    isPending,
    loading,
    error,
    data: boughtProperties = [],
  } = useQuery({
    queryKey: ["propertyBought"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/propertyBought/${user.email}`,{params: {status:"Bought"}});
      // console.log(res.data);
      return res.data;
    },
  });



  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sold Properties</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border text-left">Property Title</th>
              <th className="px-4 py-2 border text-left">Location</th>
              <th className="px-4 py-2 border text-left">Buyer Email</th>
              <th className="px-4 py-2 border text-left">Buyer Name</th>
              <th className="px-4 py-2 border text-left">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {boughtProperties.map((property) => (
              <tr key={property._id} className="odd:bg-gray-50 even:bg-white">
                <td className="px-4 py-2 border">{property.title}</td>
                <td className="px-4 py-2 border">{property.location}</td>
                <td className="px-4 py-2 border">{property.buyerEmail}</td>
                <td className="px-4 py-2 border">{property.buyerName}</td>
                <td className="px-4 py-2 border">${property.offerAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SoldProperties;
