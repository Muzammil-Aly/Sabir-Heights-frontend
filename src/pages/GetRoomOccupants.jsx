import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

function GetRoomOccupants() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [roomOccupants, setRoomOccupants] = useState([]);

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
      } catch (err) {
        setError(err.message);
      } finally {
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

    setLoading(true);
    try {
      const response = await fetch(
        `${backendURL}/api/v1/room/getRoomOccupants/${selectedRoomId}`,
        {
          method: "GET",
          credentials: "include", // ✅ Correct for fetch API
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage(data.message || "Occupants fetched successfully");
        setRoomOccupants(data.data);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        Get Room Occupants
      </h2>

      {loadingRooms ? (
        <p className="text-center text-gray-500">Loading rooms...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="roomSelect"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Select Room
            </label>
            <select
              id="roomSelect"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">-- Select a Room --</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.roomNumber || room.name || room._id}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Occupants"}
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      {error && !loadingRooms && (
        <p className="mt-4 text-red-600 text-center">{error}</p>
      )}

      {roomOccupants.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Occupants:
          </h3>
          <ul className="space-y-3">
            {roomOccupants.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-md"
              >
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <span className="text-gray-800 font-medium">
                  {user.username}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GetRoomOccupants;
