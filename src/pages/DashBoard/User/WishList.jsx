import React, { useContext, useEffect } from "react";
import useWishList from "../../../hooks/useWishList";
import Header from "../../Shared/Header";
import { MdDeleteForever } from "react-icons/md";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SweetAlertContext } from "../../../provider/SweetAlertProvider";
import Swal from "sweetalert2";
import { FaDeleteLeft } from "react-icons/fa6";
import WishListCard from "./WishListCard";

const WishList = () => {
  const [wishList, refetch] = useWishList();
  // console.log("WishList:", wishList);
  // console.log("Refetch:", refetch);
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { showDeleteAlert } = useContext(SweetAlertContext);
  // const amount = wishList.price.reduce((acc, item) => {
  //   const price = parseInt(item.replace(/,/g, ""), 10); // Parse price as an integer
  //   console.log(price);
  //   return acc + (isNaN(price) ? 0 : price); // Add to acc if valid, otherwise add 0
  // }, 0);

  // console.log(amount);
  const handleRemove = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myWishlist/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <Header heading={"My Wish List"} title={"Want to add a wish list"} />

      <div className="flex justify-between my-5">
        <h1 className="font-bold text-xl">Total Item: {wishList.length}</h1>
        {/* <h2 className="text-xl">Total Amout: $2233</h2> */}
        {/* <button className="btn btn-info">pay</button> */}
      </div>
      <div className="gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        {wishList.map((wishProperties) => {
          return (
            <WishListCard
              key={wishProperties._id}
              property={wishProperties}
              handleDelete={handleRemove}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
