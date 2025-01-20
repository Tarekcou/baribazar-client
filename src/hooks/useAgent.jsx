import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAgent = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isAgent, isPending: isAgentLoading } = useQuery({
    queryKey: ["isAgent", user?.email],
    queryFn: async () => {
      // console.log("Agent");
      const res = await axiosSecure.get(`/users/agent/${user?.email}`);
      console.log(res.data);
      return res.data?.agent;
    },
  });

  return [isAgent, isAgentLoading];
};

export default useAgent;
