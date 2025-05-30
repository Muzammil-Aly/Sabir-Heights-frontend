import React, { useState } from "react";
import axios from "axios";

const RefreshPayments = () => {
  const [loading, setLoading] = useState(false);
  const [createdCount, setCreatedCount] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleRefresh = async () => {
    if (!month || !year) {
      setError("Please enter both month and year.");
      return;
    }

    setLoading(true);
    setCreatedCount(null);
    setMessage("");
    setError(null);

    try {
      // Sending month and year as request body
      const res = await axios.post(
        `${backendURL}/api/v1/payment/refreshNextMonthPayments`,
        {
          month,
          year,
        },
        {
          withCredentials: true, // Correct place for session credentials
        }
      );
      setCreatedCount(res.data.data.createdPayments);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to refresh payments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Refresh Payments</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="month">
          Month (1-12)
        </label>
        <input
          type="number"
          id="month"
          value={month}
          min={1}
          max={12}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter month (1-12)"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="year">
          Year (e.g., 2025)
        </label>
        <input
          type="number"
          id="year"
          value={year}
          min={1900}
          max={2100}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter year (e.g., 2025)"
        />
      </div>

      <button
        onClick={handleRefresh}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Refreshing..." : "Refresh Payments"}
      </button>

      {createdCount !== null && (
        <p className="mt-4 text-green-600">
          {`Created payments for ${createdCount} users.`}
        </p>
      )}

      {message && <p className="mt-2 text-gray-700">{message}</p>}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default RefreshPayments;
