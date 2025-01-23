import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PropertyCard from "./PropertyCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllProperties = () => {
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/properties", { params: { verificationStatus: "verified" } })
      .then((response) => {
        setProperties(response.data);
      });
  }, []);

  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("All");

  // Pagination logic
  const itemsPerPage = 6;
  const offset = currentPage * itemsPerPage;
  const filteredProperties = properties.filter(
    (property) =>
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || property.status === filter)
  );

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const currentItems = sortedProperties.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sortedProperties.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleSort = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(0);
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    setCurrentPage(0);
  };

  return (
    <div className="mx-auto my-5 w-9/12 min-h-screen">
      <h1 className="mb-6 font-bold text-2xl text-center text-gray-800">
        All Properties
      </h1>

      {/* Search and Sort Functionality */}
      <div className="flex flex-col gap-2 md:flex-row justify-between items-center mb-4 w-full">
        <input
          type="text"
          placeholder="Search by location..."
          onChange={handleSearch}
          className="input-bordered w-full md:w-1/2 input"
        />

        <select onChange={handleSort} className="select-bordered select w-full md:w-1/2">
          <option value="asc">Sort by Price (Low to High)</option>
          <option value="desc">Sort by Price (High to Low)</option>
        </select>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["All", "For Sale", "For Rent"].map((status) => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Property Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      {sortedProperties.length > itemsPerPage && (
        <div className="flex justify-center mt-6">
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex space-x-2"}
            previousLinkClassName={
              "px-3 py-2 border rounded text-gray-600 bg-white hover:bg-gray-100"
            }
            nextLinkClassName={
              "px-3 py-2 border rounded text-gray-600 bg-white hover:bg-gray-100"
            }
            disabledClassName={"opacity-50 cursor-not-allowed"}
            activeClassName={"bg-blue-500 text-white"}
            pageLinkClassName={
              "px-3 py-2 border rounded text-gray-600 bg-white hover:bg-gray-100"
            }
          />
        </div>
      )}
    </div>
  );
};

export default AllProperties;
