import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
const Banner = () => {
  return (
    <div className="relative">
      <div className="top-1/3 z-10 absolute space-y-2 mx-auto pt-5 w-full text-white text-center">
        <h2 className="font-semibold text-[#70b100] text-base md:text-xl">
          Want to join us now!!!
        </h2>
        <h1 className="font-bold text-3xl md:text-5xl">
          The Best Way To Find Your Perfect Home
        </h1>
        <div className="mx-auto w-20 divider divider-success"></div>
      </div>
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        transitionTime={500}
        showIndicators={true}
      >
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
          <img
            src={banner1}
            alt="Image 1"
            className="bg-opacity-10 w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
          <img
            src={banner2}
            alt="Image 2"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
          <img
            src={banner3}
            alt="Image 3"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
