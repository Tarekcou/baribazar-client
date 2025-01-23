import React, { useContext, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";

const AddReviewModal = ({
  property,

  isOpen,
  onClose,
}) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  // console.log(property, user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review || rating < 1 || rating > 5) {
      setError("Please provide a valid review and rating (1-5).");
      return;
    }

    setError(""); // Clear previous errors

    const reviewData = {
      propertyTitle: property.title,
      name: user.displayName,
      email: user.email,
      image: user?.photoURL,
      review,
      rating,
      date: new Date().toISOString(),
    };

    try {
      // Save the review to MongoDB
      const res = await axiosPublic.post("/reviews", reviewData);
      console.log(res.data);

      // if (!res.ok) throw new Error("Failed to submit review.");

      setSuccess("Review submitted successfully!");
      setReview("");
      setRating(5);

      // Optionally close the modal after success
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Failed to submit the review. Please try again.");
      console.error(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-md">
        <h2 className="mb-4 font-semibold text-gray-700 text-xl">
          Add a Review
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="bg-gray-100 px-4 py-2 border rounded-md w-full text-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="bg-gray-100 px-4 py-2 border rounded-md w-full text-gray-600"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="px-4 py-2 border rounded-md w-full"
              rows="4"
              placeholder="Write your review here..."
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="px-4 py-2 border rounded-md w-full"
              min="1"
              max="5"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
