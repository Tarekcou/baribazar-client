import React from "react";

const WishListTable = () => {
  return (
    <div>
      {/* wish list table */}
      <div className="overflow-x-auto">
        <table className="table-fixed w-full table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {wishList.map((wish, index) => {
              return (
                <tr className=" " key={wish.wish_id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      className="rounded-md w-12 h-12"
                      src={wish.images[0]}
                      alt="wish iamge"
                    />
                  </td>
                  <td>{wish.title}</td>
                  <td>{wish.price.min}</td>
                  <td>{wish.location}</td>
                  <td className="">
                    <div className="badge badge-outline">{wish.status}</div>
                  </td>
                  <td>
                    <MdDeleteForever
                      onClick={() => handleRemove(wish._id)}
                      className="text-2xl text-red-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ); // end of row 1
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishListTable;
