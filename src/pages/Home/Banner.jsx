import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute top-1/3 space-y-2  pt-5 text-center z-10 text-white mx-auto w-full">
      <h2 className="text-[#70b100] text-base md:text-xl font-semibold">Want to join us now!!!</h2>
      <h1 className="font-bold md:text-5xl text-3xl">The Best Way To Find Your Perfect Home</h1>
      <div className="mx-auto w-20 divider divider-success"></div>
    </div>
      <Carousel
        autoPlay
        infiniteLoop

        interval={3000}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
      >
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[70vh]">
          <img
            src={banner1}
            alt="Image 1"
            className="bg-opacity-10 w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[70vh]">
          <img
            src={banner2}
            alt="Image 2"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[70vh]">
          <img
            src={banner3}
            alt="Image 3"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
