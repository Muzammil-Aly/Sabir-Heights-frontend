import React from "react";

function Logo({ width = "120px" }) {
  return (
    <div
      className="font-bold text-xl tracking-wide flex items-center gap-1"
      style={{ width }}
    >
      <span className="text-black">Sabir</span>
      <span className="text-yellow-500">Heights</span>
      <span className="text-black">Management</span>
    </div>
  );
}

export default Logo;
