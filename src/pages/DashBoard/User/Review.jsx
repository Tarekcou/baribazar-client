import React, { useContext, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
const Review = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    isPending,
    error,
    data: reviews = [],
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (reviewId) => {
    try {
      // await axios.delete(`/reviews/${reviewId}`);
      // setReviews(reviews.filter((review) => review._id !== reviewId)); // Update the state
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
          const res = await axiosPublic.delete(`/reviews/${reviewId}`);
          console.log(res);
          if (res.status == 200) {
            refetch(); // Fetch new data
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        }
      });
    } catch (error) {
      console.error("Error deleting review:", error.message);
    }
  };

  return (
    <div className="mx-auto p-4 container">
      <h1 className="mb-4 font-bold text-2xl">My Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-500">You have no reviews yet.</p>
      ) : (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              getreview={review}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Review;
