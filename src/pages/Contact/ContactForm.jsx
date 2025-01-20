import React from "react";
import Header from "../Shared/Header";

const ContactForm = () => {
  return (
    <div className="py-10">
      <div className="mx-auto p-8 rounded-lg max-w-3xl">
        {/* Headers */}
        <Header heading={"Contact Form"} title={"Get in Touch"} />
        <form className="space-y-6">
          {/* First Row: Name and Email */}
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div>
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 w-full focus:outline-none"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 w-full focus:outline-none"
                placeholder="Your Email"
              />
            </div>
          </div>

          {/* Second Row: Subject and Phone */}
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div>
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 w-full focus:outline-none"
                placeholder="Subject"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-bold text-gray-700"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 w-full focus:outline-none"
                placeholder="Your Phone Number"
              />
            </div>
          </div>

          {/* Third Row: Message */}
          <div>
            <label
              className="block mb-2 font-bold text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              className="border-gray-300 px-4 py-2 border rounded-lg focus:ring focus:ring-green-300 w-full focus:outline-none"
              placeholder="Your Message"
              rows="5"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg text-white transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
