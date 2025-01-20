import React, { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

export const SweetAlertContext = createContext();

export const SweetAlertProvider = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState(null);

  const showDeleteAlert = () => {
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const showSuccessAlert = (title, alertIcon) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      }
    });
  };

  return (
    <SweetAlertContext.Provider value={{ showDeleteAlert, showSuccessAlert }}>
      {children}
    </SweetAlertContext.Provider>
  );
};
export default SweetAlertProvider;
