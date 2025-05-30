import React, { useEffect, useState } from "react";

function UpdateOccupants() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [cnic, setCnic] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${backendURL}/api/v1/room/getAllRooms`, {
          method: "GET",
          credentials: "include", // ✅ Correct for fetch API
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load rooms");
        setRooms(data.data);
        setLoadingRooms(false);
      } catch (error) {
        setError(error.message);
        setLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!selectedRoomId) {
      setError("Please select a room");
      return;
    }
    if (!cnic.trim()) {
      setError("Please enter a CNIC");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${backendURL}/api/v1/room/updateOccupants/${selectedRoomId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cnic }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage(data.message || "Occupants updated successfully");
        setCnic("");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Update Room Occupants</h2>

      {loadingRooms ? (
        <p style={styles.infoText}>Loading rooms...</p>
      ) : error && rooms.length === 0 ? (
        <p style={styles.errorText}>{error}</p>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="roomSelect" style={styles.label}>
              Select Room
            </label>
            <select
              id="roomSelect"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              style={styles.select}
              disabled={loading}
            >
              <option value="">-- Select a Room --</option>
              {rooms.map((room) => (
                <option key={room._id || room.id} value={room._id || room.id}>
                  {room.roomNumber || room.name || room._id}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="cnicInput" style={styles.label}>
              CNIC
            </label>
            <input
              id="cnicInput"
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="Enter CNIC"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Processing..." : "Add/Remove Occupant"}
          </button>
        </form>
      )}

      {message && <p style={styles.successText}>{message}</p>}
      {error && !loadingRooms && rooms.length > 0 && (
        <p style={styles.errorText}>{error}</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "30px 25px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "22px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    color: "#444",
  },
  select: {
    padding: "10px",
    fontSize: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  input: {
    padding: "10px",
    fontSize: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    fontSize: "15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  infoText: {
    textAlign: "center",
    color: "#666",
  },
  errorText: {
    marginTop: "15px",
    color: "red",
    textAlign: "center",
  },
  successText: {
    marginTop: "15px",
    color: "green",
    textAlign: "center",
  },
};

export default UpdateOccupants;
