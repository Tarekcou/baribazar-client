import React from "react";
import { FaBuyNLarge, FaCartArrowDown, FaUser } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
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
      <Link
        to={"/dashboard"}
        className="flex justify-center bg-blue-200 my-5 p-5 border w-full font-bold text-2xl text-center"
      >
        User
      </Link>
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
