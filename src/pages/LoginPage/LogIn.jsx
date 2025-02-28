import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
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
    isLoading = false,
    setLoading,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Log in Processing..");

    signedIn(email, password)
      .then((userCredential) => {
        navigate("/");
        toast.success("Logged in");
        setUser(userCredential.user);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErr(error.message);
        toast.error("Something went wrong: " + error.message);
      });
  };

  // Function to set default credentials
  const fillCredentials = (role) => {
    const credentials = {
      admin: { email: "admin@gmail.com", password: "Admin@123" },
      agent: { email: "agent@gmail.com", password: "Agent@123" },
      user: { email: "user@example.com", password: "User@123" },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
    toast.success(`Filled ${role} credentials!`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-10 p-8 py-16 border rounded-lg w-11/12 md:w-7/12 lg:w-6/12 h-full">
          <h2 className="font-bold text-green-600 text-3xl text-center">
            Login
          </h2>
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500 w-full"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="top-2 right-3 absolute inset-y-0 flex items-center text-gray-400 hover:text-blue-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <Link to={`/forgot-password/`} state={{ email: email }}>
              <p className="my-3 text-sm underline cursor-pointer">
                Forgot Password?
              </p>
            </Link>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg focus:outline-none w-full text-white"
            >
              Login
            </button>
          </form>

          {/* Quick Fill Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button
              onClick={() => fillCredentials("admin")}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
            >
              Use Admin Credentials
            </button>
            <button
              onClick={() => fillCredentials("agent")}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white"
            >
              Use Agent Credentials
            </button>
            <button
              onClick={() => fillCredentials("user")}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
            >
              Use User Credentials
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-gray-300 border-t"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-gray-300 border-t"></div>
          </div>

          {/* Social Login */}
          <SocialLogin />

          <p className="mt-4 text-gray-400 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>

          {err && (
            <h1 className="text-red-500 text-center">Can't Login: {err}</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default LogIn;
