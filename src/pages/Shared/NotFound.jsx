import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-extrabold text-9xl text-gray-300">404</h1>
      <p className="mt-4 font-semibold text-2xl text-gray-600">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 shadow-md mt-6 px-6 py-3 rounded-lg text-white transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
