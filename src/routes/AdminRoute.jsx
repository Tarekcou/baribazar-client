import React, { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [user, isLoading] = useContext(AuthContext);

  const location = useLocation();
  // (location);
  if (isLoading || isAdminLoading) return <Loading />;
  if (user && isAdmin) return children;

  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default AdminRoute;
