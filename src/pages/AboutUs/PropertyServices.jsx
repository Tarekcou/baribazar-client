import React from "react";

const PropertyServices = () => {
  const services = [
    {
      title: "Homes For Sale",
      description: "Here are the beautiful homes that are available for sale.",
      icon: "🏠", // Replace this with actual SVG or icon classes
    },
    {
      title: "Homes For Rent",
      description: "Comfortable & Luxury homes are available for rent.",
      icon: "🔑", // Replace this with actual SVG or icon classes
    },
    {
      title: "Homes For Mortgage",
      description:
        "Homes at the point of using normal distribution of letters.",
      icon: "🏡", // Replace this with actual SVG or icon classes
    },
    {
      title: "Matching Buyer",
      description: "Buyers of the Properties are available with us.",
      icon: "🤝", // Replace this with actual SVG or icon classes
    },
    {
      title: "Price Analysis",
      description: "Comfortable & Luxury homes are available for rent.",
      icon: "📊", // Replace this with actual SVG or icon classes
    },
    {
      title: "Homes On Lease",
      description:
        "Homes at the point of using normal distribution of letters.",
      icon: "🏢", // Replace this with actual SVG or icon classes
    },
  ];

  return (
    <div className="mx-auto py-10 w-full md:10/12 lg:w-8/12">
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto px-4 max-w-7xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="shadow hover:shadow-lg p-6 border rounded-lg transition-shadow"
          >
            <div className="mb-4 text-4xl text-green-500">{service.icon}</div>
            <h3 className="mb-2 font-bold text-xl">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyServices;
