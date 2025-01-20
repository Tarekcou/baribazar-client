import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import AllProperties from "../pages/AllProperties/AllProperties";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactForm from "../pages/Contact/ContactForm";
import LogIn from "../pages/LoginPage/LogIn";
import SignUp from "../pages/SignUpPage/SignUp";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../pages/Shared/NotFound";
import DashBoard from "../layout/DashBoard";
import MyProfile from "../pages/DashBoard/User/MyProfile";
import WishList from "../pages/DashBoard/User/WishList";
import PropertyBought from "../pages/DashBoard/User/PropertyBought";
import Review from "../pages/DashBoard/User/Review";
import AdminProfile from "../pages/DashBoard/Admin/AdminProfile";
import ManageProperties from "../pages/DashBoard/Admin/ManageProperties";
import ManageReviews from "../pages/DashBoard/Admin/ManageReviews";
import AgentProfile from "../pages/DashBoard/Agent/AgentProfile";
import AddProperty from "../pages/DashBoard/Agent/AddProperty";
import AddedProperties from "../pages/DashBoard/Agent/AddedProperties";
import SoldProperties from "../pages/DashBoard/Agent/SoldProperties";
import RequestedProperties from "../pages/DashBoard/Agent/RequestedProperties";
import MakeOffer from "../pages/DashBoard/User/MakeOffer";
import ManageUser from "../pages/DashBoard/Admin/ManageUser";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    // errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "all-properties",
        element: (
          <PrivateRouter>
            <AllProperties />{" "}
          </PrivateRouter>
        ),
      },
      { path: "dashboard", element: <DashBoard /> },
      { path: "contact", element: <ContactForm /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "login", element: <LogIn /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "/property/:id",
        element: (
          <PrivateRouter>
            <PropertyDetails />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashBoard />,
      </PrivateRouter>
    ),
    // errorElement: <NotFound />,

    children: [
      // User
      { path: "myprofile", element: <MyProfile /> },
      { path: "wishlist", element: <WishList /> },
      { path: "propertyBought", element: <PropertyBought /> },
      { path: "makeoffer", element: <MakeOffer /> },
      { path: "reviews", element: <Review /> },

      // Admin
      { path: "adminProfile", element: <AdminProfile /> },
      { path: "allUsers", element: <ManageUser /> },
      { path: "manageProperties", element: <ManageProperties /> },
      { path: "manageReviews", element: <ManageReviews /> },

      // Agent
      { path: "agentProfile", element: <AgentProfile /> },
      { path: "addProperty", element: <AddProperty /> },
      { path: "updateProperty", element: <AddProperty /> },
      { path: "addedProperties", element: <AddedProperties /> },
      { path: "soldProperties", element: <SoldProperties /> },
      { path: "requestedProperties", element: <RequestedProperties /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
