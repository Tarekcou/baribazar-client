import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const SoldPropertiesAmount = () => {
  const [totalSoldAmount, setTotalSoldAmount] = useState(0);

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    isPending,
    loading,
    error,
    data: soldPropertiesAmount = [],
  } = useQuery({
    queryKey: ["propertySoldAmount"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/propertyBought/propertySoldAmount/${user.email}`
      );
      console.log(res.data);
      return res.data;
    },
  });

  if (loading) return <div className="mt-8 text-center">Loading...</div>;
  if (error)
    return <div className="mt-8 text-red-500 text-center">{error}</div>;
  if (soldPropertiesAmount.length == 0)
    return <h1 className="mt-10 text-center">Sold Properties Amount 0</h1>;

  return (
    <div className="mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-2xl">Sold Properties</h1>

      {/* Total Sold Amount */}
      <div className="bg-gray-100 shadow mb-4 p-4 border rounded">
        <h2 className="font-semibold text-lg">Total Sold Amount</h2>

        <p className="font-bold text-green-600 text-xl">
          {" "}
          $
          {soldPropertiesAmount.reduce(
            (acc, property) => acc + property.offerAmount,
            0
          )}
        </p>
      </div>

      {/* Sold Properties Table */}
      <div className="overflow-x-auto">
        <table className="bg-white border border-gray-200 min-w-full">
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
            {soldPropertiesAmount.map((property) => (
              <tr key={property._id} className="even:bg-white odd:bg-gray-50">
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

export default SoldPropertiesAmount;
