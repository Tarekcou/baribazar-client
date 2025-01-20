import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCards } from "swiper/modules";
import reviewer1 from "../../../assets/broker1.jpg";
import reviewer2 from "../../../assets/broker2.jpg";
import reviewer3 from "../../../assets/broker3.jpg";

import "./Review.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Review = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axiosPublic.get("/reviews").then((response) => {
      console.log(response.data);
      setReviews(response.data);
    });
  }, []);
  return (
    <div className="flex flex-col items-center py-10 w-full">
      <h1 className="mb-8 font-bold text-3xl">What Our Clients Say</h1>
      <Swiper
        style={{
          "--swiper-navigation-color": "#987",
          "--swiper-navigation-size": "20px",
          "--swiper-navigation-background": "#fff",
        }}
        effect={"flip"}
        autoplay={true}
        grabCursor={true}
        navigation={true}
        loop={true}
        pagination={{ clickable: true }}
        modules={[EffectFlip, Pagination, Navigation]}
        className="w-full"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center shadow-lg p-6 rounded-lg text-center">
              <img
                src={review.image}
                alt={review.name}
                className="border-4 border-gray-300 mb-4 w-36 h-44 object-cover"
              />
              <h3 className="font-semibold text-xl">{review.name}</h3>
              <p className="text-gray-500 text-sm">{review?.role}</p>
              <p className="mt-4 text-gray-600 italic">“{review.review}”</p>
              <div className="mt-4 text-green-500 text-lg">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Review;
