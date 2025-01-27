import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

const Main = ({ children }) => {
  const {isLoading} = useContext(AuthContext)
  if (isLoading) return <Loading />
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
