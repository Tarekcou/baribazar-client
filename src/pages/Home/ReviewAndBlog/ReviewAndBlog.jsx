import React from "react";
import Review from "./Review";
import Blog from "./Blog";

const ReviewAndBlog = () => {
  return (
    <div className="relative flex flex-col lg:flex-row justify-between items-center mx-auto border w-full lg:w-9/12">
      <div className="lg:w-1/2 w-full">
        <Review />
      </div>
      <div className="w-full lg:w-1/2">
        <Blog />
      </div>
    </div>
  );
};

export default ReviewAndBlog;
