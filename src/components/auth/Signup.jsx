import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
    roomNumber: "",
    paymentAmount: "",
    paymentMethod: "",
    paymentMonth: "",
    paymentYear: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const addData = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setUserData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const SendData = async (e) => {
    e.preventDefault();

    const { password, confirmPassword, avatar } = userData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!avatar) {
      toast.error("Please upload a profile picture");
      return;
    }

    const formData = new FormData();
    for (const key in userData) {
      if (userData[key]) {
        formData.append(key, userData[key]);
      }
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${backendURL}/api/v1/users/register`,
        {
          method: "POST",
          body: formData,
        },
        {
          Credentials: "include", // Ensure cookies are sent with the request
        }
      );

      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Unexpected server response: ${text}`);
      }

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful!");

      setUserData({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        cnic: "",
        roomNumber: "",
        paymentAmount: "",
        paymentMethod: "",
        paymentMonth: "",
        paymentYear: "",
        password: "",
        confirmPassword: "",
        avatar: null,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-500">
      {/* Left Side (Header Text Only) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center text-white p-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center">
          Sabir Heights Management
        </h1>
        <p className="text-base sm:text-lg text-center max-w-md">
          Manage residents, rooms & payments efficiently.
        </p>
        <p className="mt-6 text-lg font-medium">Register to continue</p>
      </div>

      {/* Right Side (Form Section) */}
      <div className="w-full lg:w-1/2 p-6 sm:p-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold text-blue-600 text-center mb-8">
            Registration Form
          </h2>

          <form
            onSubmit={SendData}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              "username",
              "fullName",
              "email",
              "phone",
              "cnic",
              "roomNumber",
              "paymentAmount",
              "paymentMethod",
              "paymentMonth",
              "paymentYear",
            ].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "paymentAmount"
                      ? "number"
                      : "text"
                  }
                  name={field}
                  value={userData[field]}
                  onChange={addData}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                />
              </div>
            ))}

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={addData}
                required
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-gray-500 hover:text-blue-600"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={addData}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Re-enter password"
              />
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={addData}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {userData.avatar?.type?.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(userData.avatar)}
                  alt="Preview"
                  className="mt-4 w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-semibold py-3 rounded-md transition ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400 mt-2">
              Designed by <span className="font-semibold">muzicode.dev</span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
