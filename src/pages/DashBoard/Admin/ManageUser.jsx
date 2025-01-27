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
      title: `Are you want to make him ${role}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, Make ${role}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/role/${user._id}`, {
          role,
        });
        // console.log(res.data);
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
  const [isFraud, setIsFraud] = useState(false);

  const handleFraudClick = (user,id,isFraud) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make him!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/isFraud/${id}`,{isFraud}).then((res) => {
          // console.log(res);
          refetch();

          // Delete All Properties
          axiosSecure.delete(`/users/isFraud/${user.email}`)

          
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Frauded!",
              text: `${user.name} is now fraud agent and all properties are deleted`,
              icon: "success",
            });
          }
        });


      
      }
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Manage All Users</h1>

      <div className="w-full">
        <h1 className="font-semibold">Total User: {users.length}</h1>
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

                  <td className="flex justify-center items-center mx-auto text-2xl text-yellow-500 ">
                    
                    <div className="flex-1">
                    {user?.role === "Admin" ? (
                      <div className="flex flex-col items-center text-base">
                        <GrUserAdmin />
                        Admin
                      </div>
                    ) :<div>
                    
                    
                    
                    
                   { user?.role === "Agent" && user?.isFraud==true ?<div className="flex flex-col gap-1 items-center text-base">
                   <span className="text-xl text-red-600 p-1 ring rounded  ring-blue-600" >Fraud  </span> 
                   <button
                   onClick={()=>handleFraudClick(user,user._id,false)}
                    className="btn btn-outline btn-xs"
                  >
                     UnMark Fraud
                  </button>
                  </div>
                   
                   :<>
                    
                    
                    
                    <div className="flex flex-col items-center text-base">
                        

                        {user?.role === "Agent" ? (<>
                          <div><MdOutlineSupportAgent />
                          Agent</div>
                          <button
               onClick={()=>handleFraudClick(user,user._id,true)}
                className="btn btn-outline btn-xs text-red-500"
              >
                 Mark as Fraud
              </button>
                        
                        </>
                          
             
                 ) : <>
                 <h1 className="text-xl">User</h1>
                 </>}
                      </div>
                    
                      
                    
                   
                    </>
                    }
                    </div>
                    
                  }
                  </div>
               <div className="text-green-600 font-bold flex-1">
                
                <select
                        id="role"
                        onChange={(e) => handleMakeAdmin(user, e.target.value)} // Pass the selected value
                        className="w-full max-w-xs select-bordered select"
                      >
                        <option disabled selected>
                          Choose a role
                        </option>

                        <option>User</option>
                        <option>Admin</option>
                        <option>Agent</option>
                      </select>
               </div>
                 
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
