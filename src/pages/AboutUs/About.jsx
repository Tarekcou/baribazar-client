import React from "react";
import img3 from "../../assets/best3.jpg";
const About = () => {
  return (
    <div className="mx-auto py-16 w-11/12 md:w-10/12 lg:w-9/12">
      <div className="flex lg:flex-row flex-col items-center mx-auto px-4 container">
        {/* Text Section */}
        <div className="lg:w-1/2">
          <h3 className="mb-2 font-bold text-green-500 text-lg">
            About BariBazar
          </h3>
          <h2 className="mb-6 font-extrabold text-4xl">Who We Are</h2>
          <p className="mb-4 font-semibold text-gray-400 text-base">
            BariBazar is a premium WordPress theme for real estate agents where
            modern aesthetics are combined with tasteful simplicity and where
            the ease of use is achieved without compromise in your ability to
            customize the design.
          </p>
          <p className="mb-4 text-gray-400 text-xs">
            Whether you are a real estate agent looking to build a website for
            your company or a web developer seeking a perfect WordPress theme
            for your next project, you are certain to appreciate the numerous
            features and benefits that our theme provides.
          </p>
          <p className="text-gray-400 text-xs">
            This is not a theme that only takes care of the front of a real
            estate business. This is also a WordPress-based property management
            system which allows you to own and maintain a real estate
            marketplace, coordinate your agents, accept submissions and offer
            membership packages.
          </p>
        </div>

        {/* Image Section */}
        <div className="mt-8 lg:mt-0 lg:ml-8 w-full lg:w-1/2 h-[60vh] overflow-hidden">
          <img
            src={img3} // Replace with your actual image URL
            alt="Modern Real Estate"
            className="shadow-lg rounded-lg w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
