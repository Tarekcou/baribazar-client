import React from "react";
import PropertyServices from "./PropertyServices";
import Broker from "../Shared/Broker";
import Company from "../Shared/Company";
import About from "./About";
import Header from "../Shared/Header";

const AboutUs = () => {
  return (
    <div className="space-y-5 my-5">
      <About />
      <Header
        heading="Property Services
"
        title="We are Offering the Best Real"
      />

      <PropertyServices />
      {/* Broker */}
      <Header heading="Our Best Agent" title="We are Offering the Best Real" />
      <Broker />
      <Header heading={"We Deal With"} title={"Well Wishers"} />

      <Company />
    </div>
  );
};

export default AboutUs;
