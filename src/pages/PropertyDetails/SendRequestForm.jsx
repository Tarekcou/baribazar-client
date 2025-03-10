import React from "react";

const SendRequestForm = () => {
  return (
    <div className="flex justify-center items-center px-4">
      <div className="p-8 rounded-lg w-full">
        <h2 className="mb-6 font-bold text-2xl text-center text-gray-800">
          Submit a Request
        </h2>
        <form>
          <div className="flex flex-col lg:flex-row justify-between lg:gap-3 w-full">
            {/* Full Name */}
            <div className="mb-4 lg:w-1/2">
              <label
                htmlFor="fullName"
                className="block mb-2 font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                className="border-gray-300 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4 lg:w-1/2">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="border-gray-300 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="mb-4 lg:w-1/2">
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="border-gray-300 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block mb-2 font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message here"
              className="border-gray-300 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full focus:outline-none"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-400 px-4 py-2 rounded-md font-medium text-white transition duration-300 btn"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendRequestForm;
