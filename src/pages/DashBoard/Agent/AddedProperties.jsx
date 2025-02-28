import React, { useContext, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import AddedPropertyCard from "./AddedPropertyCard";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
const AddedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  // const location = useLocation();
  // console.log(location);
  const {
    refetch,
    isPending,
    error,
    data: addedProperties = [],
  } = useQuery({
    queryKey: ["addedProperties", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${user.email}`);
      return res.data;
    },
  });
  // console.log(addedProperties);
  const handleDelete = (id) => {
    console.log(id);
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
        const res = await axiosSecure.delete(`/properties/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  if (addedProperties.length == 0)
    return <h1 className="text-center">No Properties added</h1>;

  return (
    <div>
      <h1 className="my-5 font-bold text-3xl text-center">Added Properties</h1>
      <div className="gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        {addedProperties.map((addedProperties) => {
          return (
            <AddedPropertyCard
              property={addedProperties}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddedProperties;
