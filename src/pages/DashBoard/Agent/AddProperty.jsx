import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SweetAlertContext } from "../../../provider/SweetAlertProvider";
import { AuthContext } from "../../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const image_bb_hosting_key = import.meta.env.VITE_BB_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_bb_hosting_key}`;
const AddProperty = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const minPrice = watch("minPrice"); // Watch minPrice to dynamically validate maxPrice
  const [previewImages, setPreviewImages] = useState([]);
  const [previewAgentImages, setPreviewAgentImages] = useState([]);
  // const [uploadedImages, setUploadedImages] = useState([]);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { showSuccessAlert } = useContext(SweetAlertContext);
  const { user } = useContext(AuthContext);
  const locate = useLocation();
  const navigate = useNavigate();
  const [isFraud,seFraud] = useState(false);
  // console.log(locate.state);
  useEffect(()=>{
    console.log(user)
    axiosSecure.get("/user/isFraud",{params:{email:user.email}})
    .then((res)=>{
      console.log(res.data)
      seFraud(res.data.isFraud)
    })
  },[])
  const {
    _id,
    agent,
    apartmentArea,
    bedrooms,
    details,
    garageSize,
    location,
    price,
    status,
    title,
    toilets,
    type,
    yearsAgo,
  } = locate.state || {};
  const uploadImages = async (files) => {
    console.log(typeof files, typeof files.length); // Debugging
    try {
      // Convert files to an array if it's not already
      const fileArray = Array.isArray(files) ? files : Array.from(files);

      if (fileArray.length === 0) {
        console.warn("No files provided for upload.");
        return [];
      }

      const uploadPromises = fileArray.map((file) => {
        const formData = new FormData();
        formData.append("image", file);
        console.log("Uploading image: ", file.name); // Debug
        return axiosPublic.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      });

      const responses = await Promise.all(uploadPromises);
      const uploadedImageURLs = responses.map((res) => res.data.data.url);
      console.log("Uploaded image URLs: ", uploadedImageURLs);
      return uploadedImageURLs;
    } catch (err) {
      console.error(
        "Error uploading images: ",
        err.message || err.response?.data || err
      );
      throw err; // Re-throw for higher-level error handling
    }
  };
  const upLoadImage=(data)=>{

  }

  const onSubmit = async (data) => {
    console.log("Submitted Data: ", data);

    try {
      // Upload property images

     

      // Construct data for submission
      
    
        if (locate?.pathname === "/dashboard/addProperty") {
          Swal.fire({
            title:  "Do you want to Add?",
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            icon:  "success",
          }).then(async (result) => {
            if (result.isConfirmed) {

              // upload image
              const propertyImages = data.images || [];
              const propertyImageURLs = await uploadImages(propertyImages);
              console.log(propertyImageURLs);
              Swal.fire("Uploading Image!", "", "success");
              // Upload agent image
              const agentImages = data.agentImage?.[0];
              const agentImageURL = agentImages
                ? (await uploadImages([agentImages]))[0]
                : null;
        
              if (!agentImageURL) {
                console.warn("No agent image uploaded.");
              }




              // upload data


              const price = {
                min: parseInt(data.minPrice),
                max: parseInt(data.maxPrice),
              };
        
              const agent = {
                name: user.displayName, // Ensure `displayName` is defined
                email: user.email, // Ensure `email` is defined
                image: agentImageURL,
                phone: data.phone,
                website: data.website,
                address: data.address,
                role: data.role,
                verificationStatus: "pending",
              };
              const { images, agentImage, ...filterData } = data;
              const propertyData = {
                ...filterData,
                images: propertyImageURLs,
                price,
                location: data.location,
                bedrooms: parseInt(data.bedrooms),
                toilets: parseInt(data.toilets),
                garageSize: parseInt(data.garageSize),
                yearsAgo: parseInt(data.yearsAgo),
                agent,
                verificationStatus: "pending",
              };
        
              console.log("Property Data: ", propertyData);
              const res = await axiosSecure.post("/properties", propertyData);
              if (res.data.insertedId) {
                showSuccessAlert();
                navigate("/dashboard/addedProperties");
                reset();
              }
              Swal.fire("Saved!", "", "success");
            }
          });
        } else {
          const res = await axiosSecure.patch(
            `/properties/${_id}`,
            propertyData
          );
          if (res.status === 200) {
            showSuccessAlert();
            reset();
            navigate("/dashboard/addedProperties");
          } else {
            console.error("Error updating property", res.data);
          }
        }
      

      // Submit the `propertyData` to your backend
      // await axios.post('/your-backend-endpoint', propertyData);
    } catch (err) {
      console.error(
        "Error during submission: ",
        err.message || err.response?.data || err
      );
      // Optionally provide user feedback
    } finally {
      // Optionally stop loading spinner or perform cleanup
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };
  const handleAgentImageChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewAgentImages(previews);
  };

  if(isFraud){
    
    
    return <h1 className="text-2xl">You are Fraud Can't Add any Properties</h1>};

  return (
    <div className="bg-white shadow-md mx-auto p-6 rounded-md max-w-4xl">
      <h2 className="mb-6 font-bold text-2xl text-center">
        {location?.pathname === "/"
          ? "Please Add Property Information"
          : " Please Update Property Information"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="text-2xl underline">Property Information</h1>
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Title
          </label>
          <input
            defaultValue={title}
            type="text"
            {...register("title", { required: "Title is required" })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter property title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Location
          </label>
          <input
            defaultValue={location}
            type="text"
            {...register("location", { required: "Location is required" })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter property location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>
        {/* Price */}
        {/* Minimum Price */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Minimum Price
          </label>
          <input
            defaultValue={price?.min}
            type="number"
            {...register("minPrice", {
              required: "Minimum price is required",
              min: {
                value: 0,
                message: "Minimum price cannot be less than 0",
              },
            })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter minimum price"
          />
          {errors.minPrice && (
            <p className="text-red-500 text-sm">{errors.minPrice.message}</p>
          )}
        </div>

        {/* Maximum Price */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Maximum Price
          </label>
          <input
            defaultValue={price?.max}
            type="number"
            {...register("maxPrice", {
              required: "Maximum price is required",
              validate: (value) =>
                parseFloat(value) >= parseFloat(minPrice) ||
                "Maximum price must be greater than or equal to the minimum price",
            })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter maximum price"
          />
          {errors.maxPrice && (
            <p className="text-red-500 text-sm">{errors.maxPrice.message}</p>
          )}
        </div>
        {/* How Many years ago */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            How Many Year Ago
          </label>
          <input
            defaultValue={yearsAgo}
            type="number"
            {...register("yearsAgo")}
            className="p-2 border rounded-md w-full"
            placeholder="HowMany Years Ago"
          />
          {errors.yearsAgo && (
            <p className="text-red-500 text-sm">{errors.yearsAgo.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Status
          </label>
          <select
            defaultValue={status}
            {...register("status", { required: "Status is required" })}
            className="p-2 border rounded-md w-full"
          >
            <option value="">Select status</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Real Estate Type Select */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Real Estate Type
          </label>
          <select
            defaultValue={type}
            {...register("realEstateType", {
              required: "Please select a type",
            })}
            className="p-2 border rounded-md w-full"
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
          {errors.realEstateType && (
            <p className="text-red-500 text-sm">
              {errors.realEstateType.message}
            </p>
          )}
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Bedrooms
          </label>
          <input
            defaultValue={bedrooms}
            type="number"
            {...register("bedrooms", { required: "Bedrooms are required" })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter number of bedrooms"
          />
          {errors.bedrooms && (
            <p className="text-red-500 text-sm">{errors.bedrooms.message}</p>
          )}
        </div>

        {/* Toilets */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Toilets
          </label>
          <input
            defaultValue={toilets}
            type="number"
            {...register("toilets", { required: "Toilets are required" })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter number of toilets"
          />
          {errors.toilets && (
            <p className="text-red-500 text-sm">{errors.toilets.message}</p>
          )}
        </div>

        {/* Apartment Area */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Apartment Area (sq ft)
          </label>
          <input
            defaultValue={apartmentArea}
            type="number"
            {...register("apartmentArea", {
              required: "Apartment area is required",
            })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter apartment area"
          />
          {errors.apartmentArea && (
            <p className="text-red-500 text-sm">
              {errors.apartmentArea.message}
            </p>
          )}
        </div>

        {/* Garage Size */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Garage Size
          </label>
          <input
            defaultValue={garageSize}
            type="number"
            {...register("garageSize", { required: "Garage size is required" })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter garage size"
          />
          {errors.garageSize && (
            <p className="text-red-500 text-sm">{errors.garageSize.message}</p>
          )}
        </div>

        {/* Details */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Details
          </label>
          <textarea
            defaultValue={details}
            {...register("details", { required: "Details are required" })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter property details"
          />
          {errors.details && (
            <p className="text-red-500 text-sm">{errors.details.message}</p>
          )}
        </div>

        {/* Multiple Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Upload Images
          </label>
          <input
            // value={images}
            type="file"
            {...register("images", {
              required: "At least one image is required",
            })}
            multiple
            accept="image/*"
            className="p-2 border rounded-md w-full"
            onChange={handleImageChange}
          />
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}

          {/* Preview Selected Images */}
          <div className="flex flex-wrap gap-4 mt-4">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="border rounded-md w-32 h-32 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Agent Information */}

        {/* Name */}
        {/* Agent Name */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Agent Name
          </label>
          <input
            type="text"
            defaultValue={user.displayName}
            readOnly
            className="bg-gray-100 p-2 border rounded-md w-full"
          />
        </div>

        {/* Agent Email */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Agent Email
          </label>
          <input
            type="email"
            defaultValue={user.email}
            readOnly
            className="bg-gray-100 p-2 border rounded-md w-full"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Upload Agent Images
          </label>
          <input
            type="file"
            {...register("agentImage", {
              required: "At least one image is required",
            })}
            multiple
            accept="image/*"
            className="p-2 border rounded-md w-full"
            onChange={handleAgentImageChange}
          />
          {errors.agentImage && (
            <p className="text-red-500 text-sm">{errors.agentImage.message}</p>
          )}

          {/* Preview Selected Images */}
          <div className="flex flex-wrap gap-4 mt-4">
            {previewAgentImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="border rounded-md w-32 h-32 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Role */}
        {/* <div>
          <label className="block font-medium text-gray-700 text-sm">
            Role
          </label>
          <input
            defaultValue={agent?.role}
            type="text"
            {...register("role", { required: "Role is required" })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter agent's role"
            readOnly
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div> */}

        {/* Address */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Address
          </label>
          <input
            defaultValue={agent?.address}
            type="text"
            {...register("address", { required: "Address is required" })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter agent's address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Phone
          </label>
          <input
            defaultValue={agent?.phone}
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                
                message: "Enter a valid phone number (e.g., 555-123-4567)",
              },
            })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter agent's phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Website */}
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            Website
          </label>
          <input
            defaultValue={agent?.website}
            type="url"
            {...register("website", {
              required: "Website URL is required",
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                message: "Enter a valid website URL",
              },
            })}
            className="p-2 border rounded-md w-full"
            placeholder="Enter agent's website"
          />
          {errors.website && (
            <p className="text-red-500 text-sm">{errors?.website.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-2 rounded-md w-full text-white"
          >
            {locate?.pathname === "/dashboard/addProperty"
              ? "Add Property"
              : "Update Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
