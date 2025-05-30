import React, { useState } from "react";
import { LogoutBtn, Container, Logo } from "../index";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../ContextProvider/Contextprovider";
import "./Header.css";
function Header() {
  const location = useLocation();
  const { status, userRole, cartQuantity, sellerOrderQuantity } = useAuth();
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const toggleAdminDropdown = () => setShowAdminDropdown(!showAdminDropdown);

  const generalNavItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/SignIn", active: !status },
    // { name: "Signup", slug: "/signup", active: !status },
    { name: "All Occupants", slug: "/all-occupants", active: status },
    { name: "Profile", slug: "/account-info", active: status },
  ];

  const adminNavItems = [
    { name: "Assign Room", slug: "/assign-room" },
    { name: "Update User Info", slug: "/update-user-info" },
    { name: "Update Payment", slug: "/update-payment" },
    { name: "Update Occupants", slug: "/update-occupants" },
    { name: "Export Payments", slug: "/export-payments" },
    { name: "Room Occupants", slug: "/room-occupants" },
    { name: "Refresh Payments", slug: "/refresh-payments" },
    { name: "Create Room", slug: "/create-room" },
    { name: "Create User", slug: "/create-user" },
    { name: "Delete User", slug: "/delete-user" },
  ];

  return (
    <header className="sticky top-0 z-[9999] bg-white border-b shadow-sm relative">
      <Container>
        <nav className="flex flex-wrap items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo width="50px" />
            <span className="text-xl font-bold text-gray-800"></span>
          </Link>

          {/* Navigation */}
          <ul className="flex items-center gap-3 overflow-x-auto whitespace-nowrap relative z-10">
            {generalNavItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link
                    to={item.slug}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                      location.pathname === item.slug
                        ? "bg-blue-600 text-white shadow"
                        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                    }`}
                  >
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}

            {/* Admin Dropdown */}
            {status && userRole === "admin" && (
              <>
                <li>
                  <button
                    onClick={toggleAdminDropdown}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 focus:outline-none"
                  >
                    Admin Tools
                  </button>
                </li>

                {showAdminDropdown && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-[10000] flex justify-center items-center"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    <div
                      className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
                    >
                      <h2 className="text-xl font-semibold mb-4">
                        Admin Tools
                      </h2>
                      <ul className="space-y-3">
                        {adminNavItems.map((item) => (
                          <li key={item.slug}>
                            <Link
                              to={item.slug}
                              onClick={() => setShowAdminDropdown(false)}
                              className="block px-4 py-2 text-gray-800 rounded hover:bg-blue-100 transition"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => setShowAdminDropdown(false)}
                        className="mt-6 w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Logout */}
            <li className="mb-4">
              <LogoutBtn />
            </li>
          </ul>
        </nav>

        {/* Trending bar */}
      </Container>
    </header>
  );
}

export default Header;
