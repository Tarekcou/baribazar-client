import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import best1 from "../../assets/best1.jpg";
import best2 from "../../assets/best2.jpg";
import best3 from "../../assets/best3.jpg";
import { FaLocationArrow } from "react-icons/fa";
import OverView from "./OverView";
import ContactDetails from "./ContactDetails";
import SendRequestForm from "./SendRequestForm";
import Comment from "./Comment";
import Review from "../Home/ReviewAndBlog/Review";
import WishReviewBtn from "./WishReviewBtn";
import useAdmin from "../../hooks/useAdmin";
import useAgent from "../../hooks/useAgent";

const PropertyDetails = () => {
  const location = useLocation();
  // console.log(location.state);
  const property = location?.state;
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleBtnDisabled = () => {
    // if (result) setBtnDisabled(true);
    // else setBtnDisabled(!btnDisabled);
    // return btnDisabled;
    setBtnDisabled(true);
  };
  const [isAdmin,]=useAdmin();
  const [isAgent,] = useAgent();
  console.log(isAdmin);
  // console.log(property);
  const navigate=useNavigate()
  if(property==null)return 
  return (
    <div className="space-y-4 bg-slate-100 mx-auto my-5 lg:p-10 p-4 w full lg:w-10/12">
      <div className="flex justify-between items-center">
        <h1 className="flex-1 font-bold text-3xl">{property?.title}</h1>

        {/* wish review btn */}
        {isAdmin ||isAgent ?<></>:
        <WishReviewBtn
          place={"top"}
          handleBtnDisabled={handleBtnDisabled}
          btnDisabled={btnDisabled}
          setBtnDisabled={setBtnDisabled}
          property={property}
        />
        }
      </div>
      <Carousel autoPlay infiniteLoop zoom interval={3000}>
        {property?.images.map((image, index) => {
          return (
            <div
              key={index}
              className="relative w-full h-[60vh] sm:h-[70vh] md:h-[70vh]"
            >
              <img
                className="bg-opacity-10 w-full h-full object-cover"
                src={image}
              />
              {/* <p className="legend">Legend {index + 1}</p> */}
            </div>
          );
        })}
      </Carousel>


      <div>
        {/* description */}
        <div>
          <h1 className="font-bold text-2xl">Details</h1>
          <p>{property?.details}</p>
        </div>
        {/* adress */}
        <div className="space-y-6 my-5">
          <p className="font-bold text-2xl">Address</p>
          <div className="flex items-center">
            <FaLocationArrow />
            <p>{property.location}</p>
          </div>
        </div>

        {/* Overview */}
        <div className="overflow-x-auto">
          <OverView property={property} />
        </div>
        {/* wish review btn */}
        {isAdmin||isAgent?<></>:
        <WishReviewBtn
          place={"bottom"}
          handleBtnDisabled={handleBtnDisabled}
          btnDisabled={btnDisabled}
          setBtnDisabled={setBtnDisabled}
          property={property}
        />
        }
        {/* Contact */}
        <ContactDetails agent={property.agent} />
        {/* review */}
        <Review />
        {/* Send Request Form */}
        <SendRequestForm />
        {/* Comment */}
        <Comment />
      </div>
    </div>
  );
};

export default PropertyDetails;
