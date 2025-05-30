import React, { useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

const CreateRoom = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floor, setFloor] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${backendURL}/api/v1/room/createRoom`,
        {
          roomNumber,
          capacity: parseInt(capacity),
          floor: parseInt(floor),
        },
        {
          withCredentials: true, // ✅ This includes cookies/session
        }
      );

      setMessage(response.data.message);
      setRoomNumber("");
      setCapacity("");
      setFloor("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the room."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-200 px-4">
      <div className="w-full max-w-lg p-8 bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🏠 Create New Room
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Room Number
            </label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g. A101"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Capacity
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g. 4"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Floor
            </label>
            <input
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="e.g. 2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white text-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <PlusCircle size={20} />
            {loading ? "Creating..." : "Create Room"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default CreateRoom;
