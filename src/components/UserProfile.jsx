import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {user.role}
          </div>
          <p className="mt-2 text-slate-500">{user.bio}</p>
          <div className="mt-4">
            <p className="text-slate-700"><strong>Email:</strong> {user.email}</p>
            <p className="text-slate-700"><strong>Location:</strong> {user.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
