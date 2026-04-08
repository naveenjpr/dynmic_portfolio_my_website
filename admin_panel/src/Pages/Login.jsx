import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { saveLoginDetails } from "../Redux/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  let baseurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let loginData = useSelector((myAllState) => {
    return myAllState.loginStore.adminDetails;
  });

  const checkLogin = (e) => {
    e.preventDefault();
    // setError("");
    let obj = {
      adminName: e.target.adminName.value,
      adminPassword: e.target.adminPassword.value,
    };

    axios
      .post(`${baseurl}/api/backend/adminAuth/login`, obj)
      .then((res) => {
        if (res.data.success) {
          dispatch(saveLoginDetails({ admin: res.data.admin }));
          navigate("/admin");
        } else {
          // toast.error(res.data.message || "Login failed");
        }
      })
      .catch((err) => {
        console.error(err);
        // toast.error("Server error. Please try again later.");
      });
  };

  useEffect(() => {
    if (loginData) {
      navigate("/admin");
    }
  }, [loginData]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back my admin 👋
        </h2>

        <form className="space-y-5" onSubmit={checkLogin}>
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              adminName
            </label>
            <input
              type="text"
              name="adminName"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              admin Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="adminPassword"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition pr-10"
            />

            {/* Toggle Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
