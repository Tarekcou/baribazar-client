import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";
import Loading from "../../components/Loading";
import SocialLogin from "../../components/SocialLogin";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    signedIn,
    setUser,
    user,
    setLoading,
    isLoading = false,
    googleLogin,
  } = useContext(AuthContext);
  const load = false;
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your login logic here
    // ("Login details:", { email, password });
    toast.loading("Log in Processing..");

    signedIn(email, password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
        // if (location?.state) navigate(location?.state);
        // else {
        //   navigate("/");
        // }
        toast.success("Loged in");
        const user = userCredential.user;
        user;
        setUser(user);
        setLoading(false);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        setErr(errorMessage);
        // (error.)
        toast.error("something went wrong" + error);
      });
  };

  // FOrgot pass
  const history = useLocation(); // For navigation to the forgot password page

  const handleForgotPasswordClick = () => {
    // Redirect to forgot password page with email as a query param
    // history.push(`/forgot-password?email=${email}`);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      {load ? (
        <Loading />
      ) : (
        <div className="my-10 py-16 p-8 border rounded-lg w-11/12 md:w-7/12 lg:w-6/12 h-full">
          <h2 className="font-bold text-3xl text-center text-green-600">
            Login
          </h2>
          <form onSubmit={handleLogin} className="mt-6">
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
                  className="mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500 w-full focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="top-2 right-3 absolute inset-y-0 flex items-center text-gray-600 hover:text-blue-500"
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
              </div>
            </div>
            {/* FOrgo pass */}
            <Link state={{ email: email }} to={`/forgot-password/`}>
              <p
                onClick={handleForgotPasswordClick}
                className="my-3 text-sm underline cursor-pointer"
              >
                {" "}
                Forgot Password?
              </p>
            </Link>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full text-white focus:outline-none"
            >
              Login
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
            Don't have an account?{" "}
            <a href="/signUp" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>

          {err ? (
            <h1 className="text-center text-red-500">
              Can't Login Check Email or Password {err}
            </h1>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default LogIn;
