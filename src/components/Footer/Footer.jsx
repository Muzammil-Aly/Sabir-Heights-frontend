import React from "react";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-10 pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left">
        {/* Logo & About */}
        <div className="col-span-2 sm:col-span-1">
          <Logo width="130px" />
          <p className="text-gray-600 mt-2">
            Sabir Heights Management – Trusted hostel management solution.
          </p>
        </div>

        {/* Just section titles */}
        <div>
          <h4 className="font-semibold mb-1">Hostel Info</h4>
          <p className="text-gray-600">About | Rules | Contact</p>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Services</h4>
          <p className="text-gray-600">Room Assign | Payments | Tenants</p>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Legal</h4>
          <p className="text-gray-600">Terms | Privacy | Policy</p>
        </div>
      </div>

      {/* Footer bottom */}

      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-500">
        <p className="text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} All rights reserved.{" "}
          <span className="font-semibold">muzicode.dev</span>
        </p>
        {/* © {new Date().getFullYear()} muzi-code.dev. All rights reserved. */}
      </div>
    </footer>
  );
}

export default Footer;
