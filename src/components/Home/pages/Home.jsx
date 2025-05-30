import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-50 to-white p-10 font-sans text-gray-900">
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-800">
          Sabir Heights Management
        </h1>
        <p className="text-lg text-blue-600">
          Welcome to Sabir Heights — Your trusted home away from home
        </p>
      </header>

      {/* About Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">About Us</h2>
        <p className="text-gray-700 leading-relaxed">
          Sabir Heights Management is dedicated to providing quality living
          spaces with top-notch facilities and a welcoming community. Situated
          conveniently near city center and public transport, we strive to make
          your stay comfortable and memorable.
        </p>
      </section>

      {/* Rooms Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          Rooms Available
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Single Room
            </h3>
            <p className="text-gray-600">
              Cozy and private rooms perfect for solo travelers or students.
            </p>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Double Room
            </h3>
            <p className="text-gray-600">
              Spacious rooms suitable for couples or friends sharing.
            </p>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Dormitory Beds
            </h3>
            <p className="text-gray-600">
              Affordable beds in shared rooms for budget-conscious guests.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Contact Us</h2>
        <ul className="space-y-3 text-gray-700">
          <li>
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+923314822966"
              className="text-blue-600 hover:underline"
            >
              0331 4822966
            </a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@sabirheights.com"
              className="text-blue-600 hover:underline"
            >
              info@sabirheights.com
            </a>
          </li>
          <li>
            <strong>Address:</strong> Sabir Heights Boys Hostel, Street 10,
            Dhobhi Mandi, Near Jholan Shah Darbar, Old Anarkali, Anarkali
            Bazaar, Lahore 54000
          </li>
        </ul>
      </section>

      {/* Call to Action Button */}
      <div className="max-w-4xl mx-auto text-center">
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-10 py-3 rounded-full shadow-lg transition"
          onClick={() => alert("Booking feature coming soon!")}
        >
          Book Your Stay
        </button>
      </div>
    </div>
  );
};

export default Home;
