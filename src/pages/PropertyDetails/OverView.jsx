import React from "react";

const OverView = ({ property }) => {
  // console.log(property);
  const {
    price,
    type,
    status,
    bedrooms,
    toilets,
    squareFeet,
    yearsAgo,
    garageSize,
    apartmentArea,
  } = property;
  return (
    <div>
      <h2 className="mt-2 font-bold text-xl">Overview</h2>
      <table className="border-collapse border-gray-200 border w-full table-auto">
        <tbody>
          {/* First and Second Columns */}
          <tr className="border-gray-200 border">
            <th className="border-slate-300 bg-gray-100 px-4 py-2 font-semibold text-left">
              Property ID
            </th>
            <td className="border-slate-300 px-4 py-2 border-r">
              {property?._id}
            </td>
            <th className="border-slate-300 bg-gray-100 px-4 py-2 font-semibold text-left">
              Year Built
            </th>
            <td className="px-4 py-2">{yearsAgo}</td>
          </tr>
          <tr className="border-gray-200 border">
            <th className="bg-gray-100 px-4 py-2 font-semibold text-left">
              Price
            </th>
            <td className="px-4 py-2 border-r">
              <div className="flex justify-between items-center">
                <p>Min: ${price.min}</p>
                <div className="divider divider-horizontal"></div>
                <p>Max: ${price.max}</p>
              </div>
            </td>
            <th className="bg-gray-100 px-4 py-2 font-semibold text-left">
              Apratment Size
            </th>
            <td className="px-4 py-2">{apartmentArea} Sqt</td>
          </tr>
          <tr className="border-gray-200 border">
            <th className="bg-gray-100 px-4 py-2 font-semibold text-left">
              Property Type
            </th>
            <td className="px-4 py-2 border-r">{type}</td>
            <th className="bg-gray-100 px-4 py-2 font-semibold text-left">
              Bedrooms
            </th>
            <td className="px-4 py-2">{bedrooms}</td>
          </tr>
          <tr className="border-gray-200 border">
            <th className="bg-gray-100 px-4 py-2 font-semibold text-left">
              Property Status
            </th>
            <td className="px-4 py-2 border-r">{status}</td>
            <th className="bg-gray-100 px-4 py-2 font-semibold text-left">
              Label
            </th>
            <td className="px-4 py-2">Sale</td>
          </tr>
          <tr className="border-gray-200 border">
            <th className="bg-gray-100 px-4 py-2 font-semibold text-left">
              Garages
            </th>
            <td className="px-4 py-2 border-r">{garageSize}</td>
            <th className="bg-gray-100 px-4 py-2 font-semibold text-left">
              Bathrooms
            </th>
            <td className="px-4 py-2">{toilets}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OverView;
