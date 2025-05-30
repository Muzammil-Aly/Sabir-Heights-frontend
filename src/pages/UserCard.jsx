import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  if (!user)
    return (
      <p className="text-center text-gray-400 text-base italic">
        No users found.
      </p>
    );

  const { _id, avatar, email, phone, fullName } = user;

  return (
    <Link
      to={`/userPost/${_id}`}
      className="flex items-center gap-4 bg-[#fefcf8] border border-[#7b3f00] rounded-md px-4 py-3 shadow-sm hover:bg-[#f7f1e8] transition w-full"
    >
      {/* Small Avatar */}
      <img
        src={avatar}
        alt="Avatar"
        className="w-12 h-12 rounded-full object-cover border border-[#7b3f00]"
      />

      {/* User Info */}
      <div className="flex-1 text-sm text-[#4a3725] space-y-1">
        <p className="font-semibold text-[#3a2b1a]">{fullName}</p>
        <p>
          <span className="text-[#7b3f00] font-medium">Email:</span> {email}
        </p>
        <p>
          <span className="text-[#7b3f00] font-medium">Phone:</span> {phone}
        </p>
      </div>
    </Link>
  );
};

export default UserCard;
