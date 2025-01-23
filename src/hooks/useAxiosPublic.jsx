import axios from "axios";
import React from "react";

const axiosPublic = axios.create({
  baseURL: "https://baribazar-server.vercel.app",
  // baseURL: "http://localhost:5005",

});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
