import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const useWishList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {
    refetch,
    isPending,
    error,
    data: wishList = [],
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myWishlist?email=${user?.email}`);
      return res.data;
    },
  });

  return [wishList, refetch];
};

export default useWishList;
