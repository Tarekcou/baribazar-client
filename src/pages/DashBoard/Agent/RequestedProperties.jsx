import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    refetch,
    data: properties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["agentRequestedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/propertyRequested/${user.email}`);
      console.log (res.data);

      // console.log(arr);
      return res.data; // Ensure this returns an array
    },
  });
  const handleStatusChange = async (id, status, propertyId) => {
    // const targetProperty = properties.find((p) => p._id === id);
    // if (!targetProperty) return;

    // const updatedRequest = { targetProperty, status };
    // console.log(id);
    const res = await axiosSecure.patch(`/propertyRequested/${id}`, {
      status,
      propertyId,
    });
    // console.log(res.data);
    if (res.status === 200) refetch();

    // handle Rejctee status change
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="mx-auto p-6 container">
      <h2 className="mb-4 font-bold text-2xl">Requested Properties</h2>
      <div className="overflow-x-auto">
        <table className="w-full table table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th>#</th>
              <th className="p-3">Property Title</th>
              <th className="p-3">Location</th>
              <th className="p-3">Buyer Email</th>
              <th className="p-3">Buyer Name</th>
              <th className="p-3">Offered Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
        
          <tbody>
            {properties.length > 0 ? (
              properties.map((property,index) => (
                <tr key={property._id} className="border-b">
                  
                  <td className="p-3">{index+1}</td>
                  <td className="p-3">{property.title || "N/A"}</td>
                  <td className="p-3">{property.location || "N/A"}</td>
                  <td className="p-3">{property.buyerEmail || "N/A"}</td>
                  <td className="p-3">{property.buyerName || "N/A"}</td>
                  <td className="p-3">${property.offerAmount || "N/A"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded ${
                        property.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : property.status === "accepted"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {property.status === "pending" && (
                      <>
                        <button
                          className="mr-2 btn btn-sm btn-success"
                          onClick={() =>
                            handleStatusChange(
                              property._id,
                              "accepted",
                              property.propertyId
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() =>
                            handleStatusChange(
                              property._id,
                              "rejected",
                              property.propertyId
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No requested properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;
