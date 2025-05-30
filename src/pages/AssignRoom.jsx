import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignRoom = () => {
  const [cnic, setCnic] = useState(""); // renamed for clarity
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Fetch available rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // const res = await fetch("/api/v1/room/getAllRooms");

        const res = await fetch(`${backendURL}/api/v1/room/getAllRooms`, {
          method: "GET",
          credentials: "include", // ✅ Correct for fetch API
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load rooms");
        setRooms(data.data); // Adjust according to your API response structure
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchRooms();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();

    if (!roomId || !cnic) {
      toast.error("Please fill in both CNIC and Room");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${backendURL}/api/v1/room/assignRoom/${roomId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cnic }), // send cnic as expected by backend
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Assignment failed");
        return;
      }

      toast.success("Room assigned successfully!");
      setCnic("");
      setRoomId("");
    } catch (err) {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        Assign Room to User
      </h2>

      <form onSubmit={handleAssign} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Enter CNIC
          </label>
          <input
            type="text"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            placeholder="Enter User CNIC"
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Room
          </label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select a Room --</option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name || `Room ${room.roomNumber}`} (Capacity:{" "}
                {room.capacity}) (Floor: {room.floor})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-3 rounded-md font-medium transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {loading ? "Assigning..." : "Assign Room"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AssignRoom;
