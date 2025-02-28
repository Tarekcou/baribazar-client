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
                className="block mb-2 font-bold text-gray-400"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 w-full"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-bold text-gray-400"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 w-full"
                placeholder="Your Email"
              />
            </div>
          </div>

          {/* Second Row: Subject and Phone */}
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
            <div>
              <label
                className="block mb-2 font-bold text-gray-400"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 w-full"
                placeholder="Subject"
              />
            </div>
            <div>
              <label
                className="block mb-2 font-bold text-gray-400"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 w-full"
                placeholder="Your Phone Number"
              />
            </div>
          </div>

          {/* Third Row: Message */}
          <div>
            <label
              className="block mb-2 font-bold text-gray-400"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300 w-full"
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
