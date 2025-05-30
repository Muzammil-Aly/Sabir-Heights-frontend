import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../ContextProvider/Contextprovider";

const AccountInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userRole, setUserRole } = useAuth();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          `${backendURL}/api/v1/users/current-user`,
          {}, // usually POST without body, so empty object
          { withCredentials: true }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleRoleSwitch = async () => {
    setLoading(true);
    try {
      const newRole = user.role === "student" ? "admin" : "student";
      await axios.post(
        `${backendURL}/api/v1/users/updateRole`,
        { role: newRole },
        { withCredentials: true } // ✅ must be added here
      );
      setUser({ ...user, role: newRole });
      setUserRole(newRole);
      localStorage.setItem("userRole", newRole);
    } catch (error) {
      console.error("Failed to update role", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700">
        <p className="text-red-500 text-lg">No user found</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-[350px] bg-white border border-gray-300 rounded-xl shadow-lg p-6 text-center">
        {/* Avatar */}
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-md mb-4"
        />

        {/* Name */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          {user.fullName}
        </h2>

        {/* Role */}
        <p className="text-sm text-gray-500 mb-4 uppercase tracking-wide">
          {user.role}
        </p>

        {/* Details */}
        <div className="text-left text-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Username:</span>
            <span>{user.username}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Phone:</span>
            <span>{user.phone}</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleRoleSwitch}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Switch to {user.role === "student" ? "admin" : "student"}
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
