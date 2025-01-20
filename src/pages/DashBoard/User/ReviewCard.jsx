import React from "react";

const ReviewCard = ({ getreview, handleDelete }) => {
  // console.log(getreview);
  const { image, propertyTitle, name, rating, review, _id, date } = getreview;

  // const handleDelete = () => {
  //   if (window.confirm("Are you sure you want to delete this review?")) {
  //     onDelete(_id); // Pass the review ID to the parent handler
  //   }
  // };

  return (
    <div className="bg-base-100 shadow-md border card">
      <div className="card-body">
        <img src={image} alt={name} />
        {/* Property Title */}
        <h2 className="font-bold text-lg card-title">{propertyTitle}</h2>

        {/* Agent Name */}
        <p className="text-gray-600">
          <span className="font-semibold">Reviewer Name:</span> {name}
        </p>

        {/* Review Time */}
        <p className="text-gray-500 text-sm">
          <span className="font-semibold">Review Time:</span>{" "}
          {new Date(date).toLocaleString()}
        </p>

        {/* Review Description */}
        <p className="mt-2">
          <span className="font-semibold">Review:</span> {review}
        </p>
        {/* Rating Description */}
        <p className="mt-2">
          <span className="font-semibold">Rating:</span> {rating}
        </p>

        {/* Delete Button */}
        <div className="justify-end mt-4 card-actions">
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
