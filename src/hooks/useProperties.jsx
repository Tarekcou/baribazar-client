import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosSecure } from "./useAxiosSecure";

const useProperties = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axiosSecure.get("/properties").then((response) => {
      // console.log(response.data.properties);
      setProperties(response.data);
    });
  }, []);
  return [properties];
};

export default useProperties;
