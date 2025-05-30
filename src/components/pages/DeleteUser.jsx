import React, { useState } from "react";
import axios from "axios";

function DeleteUser() {
  const [cnic, setCnic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await axios.delete(
        `${backendURL}/api/v1/users/deleteCreatedUser`,
        {
          data: { cnic },
          withCredentials: true,
        }
      );
      setMessage(response.data.message || "User deleted successfully!");
      setCnic("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Delete User by CNIC</h2>
      <form onSubmit={handleDelete} style={styles.form}>
        <input
          type="text"
          placeholder="Enter CNIC"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          required
          style={styles.input}
        />
        <button
          type="submit"
          disabled={loading}
          style={loading ? styles.buttonDisabled : styles.button}
        >
          {loading ? "Deleting..." : "Delete User"}
        </button>
      </form>
      {message && <p style={styles.successMessage}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: "3rem auto",
    padding: "2rem",
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
    fontWeight: "600",
    fontSize: "1.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1.1rem",
    borderRadius: 8,
    border: "1.8px solid #ccc",
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  button: {
    padding: "0.75rem 1rem",
    fontSize: "1.1rem",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#d9534f",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 3px 8px rgba(217, 83, 79, 0.6)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  buttonDisabled: {
    padding: "0.75rem 1rem",
    fontSize: "1.1rem",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#e37c7a",
    color: "#fff",
    fontWeight: "600",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  successMessage: {
    marginTop: "1.2rem",
    color: "#28a745",
    fontWeight: "600",
  },
  errorMessage: {
    marginTop: "1.2rem",
    color: "#dc3545",
    fontWeight: "600",
  },
};

export default DeleteUser;
