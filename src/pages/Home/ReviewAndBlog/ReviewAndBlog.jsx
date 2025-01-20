import React from "react";
import Review from "./Review";
import Blog from "./Blog";

const ReviewAndBlog = () => {
  return (
    <div className="relative flex justify-between items-center mx-auto border w-9/12">
      <div className="w-1/2">
        <Review />
      </div>
      <div className="w-1/2">
        <Blog />
      </div>
    </div>
  );
};

export default ReviewAndBlog;
