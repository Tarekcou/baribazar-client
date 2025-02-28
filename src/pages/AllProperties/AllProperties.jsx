import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PropertyCard from "./PropertyCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllProperties = () => {
  const axiosPublic = useAxiosPublic();
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("All");

  // Fetch properties
  useEffect(() => {
    axiosPublic
      .get("/properties", { params: { verificationStatus: "verified" } })
      .then((response) => {
        setProperties(response.data);
      });
  }, []);

  // Sort and filter properties when state changes
  const getFilteredSortedProperties = () => {
    let filtered = properties.filter(
      (property) =>
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "All" || property.status === filter)
    );

    return filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.price.min - b.price.min
        : b.price.min - a.price.min
    );
  };

  // Use filtered and sorted data for pagination
  const sortedProperties = getFilteredSortedProperties();
  const itemsPerPage = 6;
  const offset = currentPage * itemsPerPage;
  const currentItems = sortedProperties.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sortedProperties.length / itemsPerPage);

  // Event Handlers
  const handlePageClick = ({ selected }) => setCurrentPage(selected);
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
      <h1 className="mb-6 font-bold text-gray-800 text-2xl text-center">
        All Properties
      </h1>

      {/* Search and Sort */}
      <div className="flex md:flex-row flex-col justify-between items-center gap-2 mb-4 w-full">
        <input
          type="text"
          placeholder="Search by location..."
          onChange={handleSearch}
          className="input-bordered w-full md:w-1/2 input"
        />
        <select
          onChange={handleSort}
          className="w-full md:w-1/2 select-bordered select"
        >
          <option value="asc">Sort by Price (Low to High)</option>
          <option value="desc">Sort by Price (High to Low)</option>
        </select>
      </div>

      {/* Filters */}
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
