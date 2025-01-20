import React, { useContext, useEffect } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Header from "../../Shared/Header";
import PropertyBoughtCard from "./PropertyBoughtCard";
import Swal from "sweetalert2";
const PropertyBought = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    isPending,
    error,
    data: boughtProperties = [],
  } = useQuery({
    queryKey: ["propertyBought"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/propertyBought/${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  const handleDelete = async (propertyId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosPublic.delete(`/propertyBought/${propertyId}`);
          console.log(res.data);
          if (res.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header
        heading={"My Property Bought List"}
        title={"Want to add a More!!! "}
      />

      <div className="flex justify-between my-5">
        <h1 className="text-xl">Total Item: {boughtProperties.length}</h1>
      </div>
      <div className="gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        {boughtProperties.map((boughtProperty) => {
          return (
            <PropertyBoughtCard
              property={boughtProperty}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PropertyBought;
