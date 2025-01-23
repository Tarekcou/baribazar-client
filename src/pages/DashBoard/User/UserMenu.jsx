import React from "react";
import { FaBuyNLarge, FaCartArrowDown, FaUser } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { NavLink } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const UserMenu = ({ wishlist }) => {
  const {
    refetch,
    isPending,
    error,
    data: reviews = [],
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${user.email}`);
      refetch();

      return res.data;
    },
  });
  return (
    <div>
      <h1 className="bg-blue-200 py-5 border font-bold text-center">User</h1>

      <NavLink className={"btn border-none w-full"} to="/dashboard/wishlist">
        <FaCartArrowDown />
        WishList
        <div className="bg-green-700 border-none text-white badge">
          +{wishlist.length}
        </div>
      </NavLink>
      <NavLink
        className={"btn border-none w-full"}
        to="/dashboard/propertybought"
      >
        <FaBuyNLarge />
        Property Bought
      </NavLink>
      <NavLink className={"btn border-none w-full"} to="/dashboard/reviews">
        <MdOutlineRateReview />
        My Review{" "}
        <div className="bg-green-600 border-none badge badge-secondary">
          +{reviews.length}
        </div>
      </NavLink>
      <NavLink className={"btn border-none w-full"} to="/dashboard/myprofile">
        <FaUser />
        My Profile
      </NavLink>
    </div>
  );
};

export default UserMenu;
