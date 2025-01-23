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
const sampleReviews = [
  {
    _id: "1",
    image: "https://www.shutterstock.com/shutterstock/photos/2492229437/display_1500/stock-photo-business-man-working-using-laptop-computer-hands-typing-keyboard-professional-investor-working-2492229437.jpg",
    name: "John Doe",
    role: "Software Engineer",
    review: "This service has exceeded my expectations. Highly recommended!",
    rating: 5,
  },
  {
    _id: "2",
    image:"https://img.freepik.com/free-photo/young-handsome-man-posing-grey-wall_176420-4.jpg?t=st=1737437239~exp=1737440839~hmac=0c8457978ea60a6c0dd2e9ced8c5c01472a9130c78f8c333982742d43ddedf95&w=996",
    name: "Jane Smith",
    role: "Product Manager",
    review: "A wonderful experience from start to finish.",
    rating: 4,
  },
  {
    _id: "3",
    image: "https://www.shutterstock.com/shutterstock/photos/2185639919/display_1500/stock-photo-asian-male-freelancer-walking-near-business-center-holding-phone-smiling-reading-news-successful-2185639919.jpg",
    name: "Michael Brown",
    role: "UX Designer",
    review: "The team was extremely professional and helpful throughout.",
    rating: 4,
  },
  
];

const Review = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState(sampleReviews );
  useEffect(() => {
    axiosPublic.get("/reviews").then((response) => {
      // console.log(response.data);
      setReviews((prevReviews) => [...prevReviews, ...response.data]);
    });
  }, []);
  return (
    <div className="flex flex-col items-center py-10 w-full ">
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
        {reviews.map((review,index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center shadow-lg p-6 rounded-lg text-center">
              <img
                src={review.image}
                alt={review.name}
                className="border-4 border-gray-300 mb-4 lg:w-36 w-64 h-64 lg:h-44 object-cover"
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
