import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import blog1 from "../../../assets/best1.jpg";
import blog2 from "../../../assets/best2.jpg";
import blog3 from "../../../assets/best3.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Resources that and they thought you may find useful",
    description:
      "When it comes to real estate, it’s all about location. But when it comes to...",
    author: "admin",
    date: "April 20, 2023",
    image: blog1,
  },
  {
    id: 2,
    title:
      "A new residential project launched - Find the right property for you",
    description:
      "When it comes to real estate, it’s all about location. But when it comes to...",
    author: "admin",
    date: "April 20, 2023",
    image: blog2,
  },
  {
    id: 3,
    title: "How to maximize property investment in 2023",
    description:
      "When it comes to real estate, it’s all about location. But when it comes to...",
    author: "admin",
    date: "April 21, 2023",
    image: blog3,
  },
  {
    id: 4,
    title: "Best places to invest in real estate",
    description:
      "When it comes to real estate, it’s all about location. But when it comes to...",
    author: "admin",
    date: "April 21, 2023",
    image: blog1,
  },
];

const Blog = () => {
  return (
    <div className="py-10 w-full">
      <h2 className="mb-8 font-bold text-3xl text-center">Recent Blog Posts</h2>
      <Swiper
        style={{
          "--swiper-navigation-color": "#987",
          "--swiper-navigation-size": "20px",
          "--swiper-navigation-background": "#fff",
          "--swiper-navigation-position": " bottom",
        }}
        slidesPerView={1} // Show 1 group per slide
        slidesPerGroup={1} // Move 1 group per swipe
        spaceBetween={30}
        navigation
        modules={[Navigation]}
        className="mx-auto w-11/12"
      >
        {blogPosts
          .reduce((acc, _, i, arr) => {
            // Group items in pairs of 2
            if (i % 2 === 0) acc.push(arr.slice(i, i + 2));
            return acc;
          }, [])
          .map((group, index) => (
            <SwiperSlide key={index}>
              <div className="gap-4 grid grid-rows-2 h-[400px]">
                {group.map((post) => (
                  <div
                    key={post.id}
                    className="flex shadow-lg rounded-lg overflow-hidden"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-1/3 h-auto object-cover"
                    />
                    <div className="p-2 w-2/3">
                      <h3 className="mb-1 font-semibold text-lg">
                        {post.title}
                      </h3>
                      <p className="mb-1 text-gray-600">{post.description}</p>
                      <div className="text-gray-500 text-sm">
                        <span className="block mb-2">
                          Author: {post.author}
                        </span>
                        <span>Date: {post.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Blog;
