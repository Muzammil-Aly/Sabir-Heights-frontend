import React, { useState } from "react";
import axios from "axios";

const ExportPayments = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleExport = async () => {
    try {
      if (!month || !year) {
        alert("Please select both month and year.");
        return;
      }

      const response = await axios.get(
        `${backendURL}/api/v1/payment/exportPaymentsToExcel`,
        {
          params: { month, year, status },
          responseType: "blob",
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "payments.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export payments. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">
        Export Payments
      </h2>

      <div className="mb-4">
        <label className="block mb-1 text-gray-600">Select Month</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">-- Select Month --</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-600">Enter Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 2025"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-gray-600">Payment Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      <button
        onClick={handleExport}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
      >
        Download Excel
      </button>
    </div>
  );
};

export default ExportPayments;
