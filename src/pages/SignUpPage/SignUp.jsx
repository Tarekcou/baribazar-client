import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { SweetAlertContext } from "../../provider/SweetAlertProvider";
import SocialLogin from "../../components/SocialLogin";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const axiosPublic = useAxiosPublic();
  const { showDeleteAlert, showSuccessAlert } = useContext(SweetAlertContext);
  const navigate = useNavigate();

  const {
    isLoading,
    setLoading,
    registerWithEmail,
    updateUserProfile,
    setUser,
    setimageKey,
    googleLogin,
  } = useContext(AuthContext);
  const load = false;
  const [errMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    photoUrl: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage({});

    /^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(password);
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(password)) {
      setErrorMessage({
        ...errMessage,
        password: (
          <ul className="py-2 pl-5 list-disc">
            <li>Must have an Uppercase letter in the password </li>
            <li> Must have a Lowercase letter in the password </li>{" "}
            <li>Length must be at least 6 character</li>
          </ul>
        ),
      });
      setLoading(false);
      return;
    }

    registerWithEmail(email, password)
      .then((userCredential) => {
        toast("Register is processing..");
        // Signed up
        const user = userCredential.user;

        setLoading(true);
        setUser(user);

        updateUserProfile(name, photoUrl).then(() => {
          const userInfo = {
            name,
            email,
          };
          console.log(userInfo);
          axiosPublic.post("/user", userInfo).then((res) => {
            console.log("user added", res.data);
            if (res.data.insertedId) {
              showSuccessAlert();
              navigate("/");
            }
          });
        });

        setimageKey((prev) => prev + 1);

        // ...
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage({
          ...errMessage,
          submitError: errorMessage + "Error submit Registration Information",
          errorCode,
        });
        setLoading(false);
        // ..
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {load ? (
        <Loading />
      ) : (
        <>
          <div className="p-8 border rounded-lg w-11/12 md:w-7/12 lg:w-6/12">
            <h2 className="font-bold text-3xl text-center text-green-700">
              Register
            </h2>
            <form onSubmit={handleRegister} className="mt-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 w-full focus:outline-none"
                />
                {errMessage.name && (
                  <label className="text-red-600 text-xs">
                    {errMessage.name}
                  </label>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 w-full focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="relative mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 w-full focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="top-5 right-3 absolute flex items-center text-gray-600 hover:text-blue-500"
                  >
                    {showPassword ? (
                      <span>
                        <FaEyeSlash />
                      </span> // Replace with an icon like FontAwesome or Heroicons
                    ) : (
                      <span>
                        <FaEye />
                      </span> // Replace with an icon
                    )}
                  </button>
                  {errMessage.password && (
                    <label className="text-red-600 text-xs">
                      {errMessage.password}
                    </label>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Photo Url
                </label>
                <input
                  type="photoUrl"
                  id="photoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 w-full focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full text-white focus:outline-none"
              >
                Sign up
              </button>
            </form>
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-gray-300 border-t"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-gray-300 border-t"></div>
            </div>
            {/* Social Login */}
            <SocialLogin />

            <p className="mt-4 text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>

            {errMessage.submitError && (
              <h1 className="text-center text-red-500">
                {errMessage.submitError}
              </h1>
            )}
          </div>
        </>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default SignUp;
