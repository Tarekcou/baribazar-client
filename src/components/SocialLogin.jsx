import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleLogin, setUser, loading, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleGoogleLogin = () => {
    toast.success("Log in Processing...");
    googleLogin()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/user", userInfo).then((res) => {
          // console.log(res);
          if (location?.state) navigate(location?.state);
          else {
            navigate("/");
          }
        });

        const user = result.user;
        setUser(user);

        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        type="submit"
        className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-800 my-2 px-4 py-2 rounded-lg w-full text-white cursor-pointer focus:outline-none"
      >
        <FaGoogle className="" /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
