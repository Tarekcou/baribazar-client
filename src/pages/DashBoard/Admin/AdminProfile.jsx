import React, { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const { displayName, email, photoURL, role } = user;
  console.log(user);
  return (
    <div className="mx-auto p-6 max-w-md container">
      <div className="shadow-md p-6 rounded-lg">
        {/* User Image */}
        <div className="flex justify-center">
          <img
            src={photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="border-2 border-primary rounded-full w-24 h-24"
          />
        </div>

        {/* User Details */}
        <div className="mt-4 text-center">
          <h1 className="font-bold text-gray-800 text-2xl">
            {displayName || "Anonymous"}
          </h1>
          <p className="text-gray-600">{email}</p>

          {role && (
            <p className="inline-block bg-primary mt-2 px-4 py-1 rounded-full text-white">
              Role: {role}
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Additional Information</h2>
          <ul className="mt-2 text-gray-600 list-disc list-inside">
            <li>Member since: {new Date().toLocaleDateString()}</li>
            <li>Status: Active</li>
            <li>Preferences: Opted-in for notifications</li>
          </ul>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6 text-center">
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
