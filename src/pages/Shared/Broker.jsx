import React from "react";
import broker1 from "../../assets/broker1.jpg";
import broker2 from "../../assets/broker2.jpg";
import broker3 from "../../assets/broker3.jpg";
import broker4 from "../../assets/broker4.jpg";
const Broker = () => {
  const brokers = [
    {
      name: "Barbara Corcoran",
      description: "Real estate investor and founder of The Corcoran.",
      image: broker1, // Replace with the actual image URL
    },
    {
      name: "Ryan Serhant",
      description: "Top NYC broker, author, and TV personality.",
      image: broker2, // Replace with the actual image URL
    },
    {
      name: "Frederik Eklund",
      description: "Luxury real estate broker and bestselling author.",
      image: broker3, // Replace with the actual image URL
    },
    {
      name: "Josh Altman",
      description: "Celebrity real estate agent specializing in luxury homes.",
      image: broker4, // Replace with the actual image URL
    },
  ];

  return (
    <div className="space-y-4 mx-auto pb-16 w-11/12 md:w-10/12 lg:w-9/12 h-auto text-center">
      <div className="divide-primary divider"></div>

      <div className="gap-3 grid grid-cols-1 md:grid-cols-4">
        {brokers.map((broker, index) => (
          <div key={index} className="hover:shadow-xl max-h-[250px]">
            <img
              className="shadow hover:shadow-lg w-full h-full object-cover"
              src={broker.image}
              alt={broker.name}
            />
            <div className="bg-gray-100 py-4 border">
              <h2 className="font-bold text-md">{broker.name}</h2>
              <p className="text-gray-500 text-sm">{broker.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Broker;
