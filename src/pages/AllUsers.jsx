import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const hostelBeige = "#f9f5ec"; // Light beige for background
  const deepBrown = "#5a3e2b"; // For text and borders
  const cardShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${backendURL}/api/v1/users/allVendors`, {
        method: "GET",
        credentials: "include", // ✅ Correct for fetch API
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.data);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const loadingStyle = {
    textAlign: "center",
    color: deepBrown,
    border: `1px solid ${deepBrown}`,
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: hostelBeige,
    fontWeight: "bold",
    boxShadow: cardShadow,
  };

  const noUsersStyle = {
    textAlign: "center",
    color: deepBrown,
    border: `1px solid ${deepBrown}`,
    padding: "12px",
    borderRadius: "6px",
    backgroundColor: hostelBeige,
    fontWeight: "bold",
    boxShadow: cardShadow,
  };

  const containerStyle = {
    padding: "2rem",
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    backgroundColor: hostelBeige,
    borderRadius: "12px",
    border: `2px solid ${deepBrown}`,
    boxShadow: cardShadow,
  };

  if (!loading && users.length === 0) {
    return <p style={noUsersStyle}>No hostel records found.</p>;
  }

  if (loading) return <p style={loadingStyle}>Loading hostel records...</p>;

  return (
    <div style={containerStyle}>
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default AllUsers;
