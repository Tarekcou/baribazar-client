import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { SweetAlertContext } from "../../../provider/SweetAlertProvider";
import Swal from "sweetalert2";

const MakeOffer = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const { user } = useContext(AuthContext);
  console.log(locate.state);
  const { property } = locate.state || {};
  const { showSuccessAlert } = useContext(SweetAlertContext);
  // States
  const [offerAmount, setOfferAmount] = useState("");
  const [error, setError] = useState("");

  // Destructure property details
  const { _id, title, location, agent, price, images } = property || {};
  const axiosPublic = useAxiosPublic();
  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the offer amount
    if (offerAmount < price.min || offerAmount > price.max) {
      setError(
        `Offer must be between ${price.min} and ${price.max}. Please try again.`
      );
      return;
    }

    setError(""); // Clear error if validation passes

    // Create the offer object
    const offerData = {
      propertyId: _id,
      title,
      location,
      offerAmount: parseInt(offerAmount),
      buyerName: user.displayName,
      buyerEmail: user.email,
      agent,
      date: new Date("2015-03"),
      status: "pending",
      images,
    };

    // Save to the database (example with fetch API)
    try {
      Swal.fire({
        title: "Do you want make this offer?",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        // denyButtonText: `Don't save`,
        icon: "info",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic.post("/propertyBought", offerData).then((res) => {
            console.log(res.data);
            if (res.status == 200) {
              Swal.fire("Saved!", "", "success");
              navigate("/dashboard/propertyBought");
            }
          });
        }
      });
    } catch (err) {
      console.error(err.message);
      setError("Failed to make the offer. Please try again.");
    }
  };

  // if (!property) {
  //   return (
  //     <div className="mt-10 text-center text-red-500">
  //       No property details found. Go back and try again.
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white shadow-md mx-auto mt-10 p-6 rounded-md max-w-3xl">
      <h1 className="mb-6 font-bold text-2xl text-gray-800">Make an Offer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">
            Property Title
          </label>
          <input
            type="text"
            value={title}
            readOnly
            className="bg-gray-100 px-4 py-2 border rounded-md w-full text-gray-600"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            readOnly
            className="bg-gray-100 px-4 py-2 border rounded-md w-full text-gray-600"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Agent Name</label>
          <input
            type="text"
            value={agent.name}
            readOnly
            className="bg-gray-100 px-4 py-2 border rounded-md w-full text-gray-600"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Agent Email</label>
          <input
            type="text"
            value={agent.email}
            readOnly
            className="bg-gray-100 px-4 py-2 border rounded-md w-full text-gray-600"
          />
        </div>

        <div>
          <label className="block font-medium text-black text-xl">
            Offer Amount
          </label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="px-4 py-2 border rounded-md ring w-full"
            placeholder={`Enter an amount between ${price.min} and ${price.max}`}
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Buyer Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="bg-gray-100 px-4 py-2 border rounded-md w-full text-gray-600"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Buyer Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="bg-gray-100 px-4 py-2 border rounded-md w-full text-gray-600"
          />
        </div>

        

        <div>
          <label className="block font-medium text-gray-700">Buying Date</label>
          <input
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full text-white"
        >
          Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
