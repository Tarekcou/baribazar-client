import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { SweetAlertContext } from "../../provider/SweetAlertProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useWishList from "../../hooks/useWishList";
import AddReviewModal from "./AddReviewModal";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const WishReviewBtn = ({
  place,
  property,
  handleBtnDisabled,
  btnDisabled,
  setBtnDisabled,
}) => {
  const { user } = useContext(AuthContext);
  const { showSuccessAlert, showDeleteAlert } = useContext(SweetAlertContext);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [, refetch] = useWishList();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  // console.log(property);
  const handleWishClick = () => {
    if (user && user.email) {
      const wishList = {
        wish_id: property?._id,
        email: user.email,
        title: property.title,
        price: property.price,
        location: property.location,
        images: property.images,
        status: property.status,
        verificationStatus: property.verificationStatus,
        agent: property.agent,
      };
      axiosSecure.post(`/wishlist`, wishList).then((res) => {
        console.log(res.data);
        // setWishList([...wishList, res.data]);
        // setLoading(false);
        showSuccessAlert("One Item Successfully Added to Wishlist", "success");

        // refech to make the wishlish dynamic
        refetch();
        handleBtnDisabled();
        // setBtnDisabled(true);
      });
    } else {
      showDeleteAlert();
    }
  };
  useEffect(() => {
    axiosSecure
      .get(`/wishlist`, {
        params: {
          id: property?._id,
          email: user.email,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setBtnDisabled(true);
        }
      });
  }, []);
  const {
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

  return (
    <div>
      <div className="flex justify-center gap-2 mx-auto my-5 w-full">
        <button
          disabled={btnDisabled}
          onClick={handleWishClick}
          className={`btn btn-warning ${
            place == "top" ? "btn-sm" : "btn-wide"
          } `}
        >
          {btnDisabled ? " Added to WishList" : "Add to WishList"}
        </button>
        <button
          onClick={handleOpenModal}
          className={`btn btn-accent ${
            place == "top" ? "btn-sm" : "btn-wide"
          } `}
        >
          Add Review{" "}
          <div className="badge badge-secondary">+{reviews.length}</div>
        </button>
      </div>

      <AddReviewModal
        property={property}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default WishReviewBtn;
