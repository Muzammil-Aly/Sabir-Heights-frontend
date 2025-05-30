import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateUserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    fullName: "",
    roomNumber: "",
    cnic: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // (Optional) Load current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.patch(
          `${backendURL}/api/v1/users/update-userCredentials`,
          {
            withCredentials: true, // Ensure session credentials are sent
          }
        );
        const { username, email, phone, fullName, roomNumber, cnic } =
          res.data?.data || {};
        setFormData({ username, email, phone, fullName, roomNumber, cnic });
      } catch (err) {
        console.error("Error loading profile", err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const values = Object.values(formData);
    if (values.some((val) => !val || val.trim() === "")) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    if (!formData.email.includes("@")) {
      setMessage({ type: "error", text: "Invalid email format." });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.patch(
        `${backendURL}/api/v1/users/update-userCredentials`,
        formData,
        {
          withCredentials: true, // ✅ Correct key to send cookies/session
        } // Ensure session credentials are sent
      );
      setMessage({ type: "success", text: res.data.message });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Update failed.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Update Profile
      </h2>

      {message.text && (
        <div
          className={`p-2 mb-4 rounded text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "username", label: "Username" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "tel" },
          { name: "fullName", label: "Full Name" },
          { name: "roomNumber", label: "Room Number" },
          { name: "cnic", label: "CNIC" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block mb-1 text-gray-600">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
