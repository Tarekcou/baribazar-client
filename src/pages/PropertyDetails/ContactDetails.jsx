import React from "react";
import broker from "../../assets/broker1.jpg";
const ContactDetails = ({ agent }) => {
  const { name, role, address, phone, email, website, image } = agent;
  return (
    <div className="flex justify-center items-center shadow-md my-10 px-4">
      <div className="mx-auto p-3  rounded-lg overflow-hidden container">
        <div className="items-center grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Contact Information */}
          <div className="p-8">
            <h2 className="mb-4 font-bold text-2xl">Contact Information</h2>
            <p className="text-gray-700">
              <strong>Name: </strong>
              {name}
            </p>
            <p className="text-gray-700">
              <strong>Role: </strong>
              {role}
            </p>
            <p className="text-gray-700">
              <strong>Address: </strong>
              {address}
            </p>
            <p className="text-gray-700">
              <strong>Phone: </strong>
              {phone}
            </p>
            <p className="text-gray-700">
              <strong>Email: </strong>
              <a href={email} className="text-blue-500 hover:underline">
                {email}
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Website: </strong>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {website}
              </a>
            </p>
          </div>

          {/* Right Side: Image */}
          <div className="relative mx-auto w-[200px] h-[200px]">
            <img
              src={image}
              alt="Contact"
              className="w-full h-full object-fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
