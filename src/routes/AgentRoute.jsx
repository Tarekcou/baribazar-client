import React, { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import useAgent from "../hooks/useAgent";

const AgentRoute = ({ children }) => {
  const [isAgent, isAgentLoading] = useAgent();
  const [user, isLoading] = useContext(AuthContext);

  const location = useLocation();
  // (location);
  if (isLoading || isAgentLoading) return <Loading />;
  if (user && isAgent) return children;

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default AdminRoute;
