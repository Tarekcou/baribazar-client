import React from "react";
import Banner from "./Banner";
import BestHouse from "./BestHouse";
import Header from "../Shared/Header";
import Advertisement from "./Advertisement";
import Broker from "../Shared/Broker";
import Contact from "../Contact/ContactForm";
import ContactUs from "./ContactUs";
import ReviewAndBlog from "./ReviewAndBlog/ReviewAndBlog";
import Company from "../Shared/Company";

const Home = () => {
  return (
    <div className="mb-10">
      <div className="space-y-10">
        <Banner />
        <Header
          heading="Best House to Purchase"
          title="We are Offering the Best Real Estate"
        />
        <BestHouse />
        {/* Advertisement */}
        <Header
          heading="Properties For Sale & Rent(Advertised)"
          title="Our Featured Properties For Sale and Rent"
        />
        <Advertisement />

        {/* Contact */}
        <ContactUs />
        {/* Broker */}
        <Header
          heading="Our Real State Brokers"
          title="We are Offering the Best Real"
        />
        <Broker />

        {/* REview */}

        <ReviewAndBlog />
        <Header heading={"We Deal With"} title={"Well Wishers"} />
        <Company />
      </div>
    </div>
  );
};

export default Home;
