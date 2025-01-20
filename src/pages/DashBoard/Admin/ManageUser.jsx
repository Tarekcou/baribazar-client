import React, { useContext, useState } from "react";
import Header from "../../Shared/Header";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsersGear } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineSupportAgent } from "react-icons/md";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { SweetAlertContext } from "../../../provider/SweetAlertProvider";
import Swal from "sweetalert2";
import { FaUserAltSlash } from "react-icons/fa";
const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { showDeleteAlert } = useContext(SweetAlertContext);
  const {
    refetch,
    isPending,
    error,
    data: users = [],
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // console.log(users);
  const handleUserDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          // console.log(res);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  const handleMakeAdmin = (user, role) => {
    console.log(role);
    Swal.fire({
      title: "Are you want to make him Admin?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/role/${user._id}`, {
          role,
        });
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: `Want to make him ${role}!`,
            text: `${user.name}  is now ${role}`,
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div className="w-full">
      <Header heading="Manage All Users" title="How Many!!" />

      <div className="w-full">
        <h1>Total User: {users.length}</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center text-xl">
              <th>Serial</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="w-full text-base text-center">
            {users.map((user, index) => {
              return (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td className="flex justify-center items-center mx-auto text-2xl text-yellow-500 cursor-pointer">
                    {user?.role === "Admin" ? (
                      <div className="flex flex-col items-center text-base">
                        <GrUserAdmin />
                        Admin
                      </div>
                    ) : user?.role === "Agent" ? (
                      <div className="flex flex-col items-center text-base">
                        <MdOutlineSupportAgent />
                        Agent
                      </div>
                    ) : (
                      <select
                        id="role"
                        onChange={(e) => handleMakeAdmin(user, e.target.value)} // Pass the selected value
                        className="w-full max-w-xs select-bordered select"
                      >
                        <option disabled selected>
                          Choose a role
                        </option>

                        <option>Admin</option>
                        <option>Agent</option>
                      </select>
                    )}
                  </td>

                  <th>
                    <button
                      onClick={() => handleUserDelete(user._id)}
                      className="bg-red-700 text-white text-xl btn btn-ghost btn-sm"
                    >
                      <MdDeleteForever />
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
