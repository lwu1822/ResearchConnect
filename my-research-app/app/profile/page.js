"use client";
import { useState, useEffect } from 'react';

// --- This is our mock profile data ---
const mockUserProfile = {
  email: "testuser@example.com",
  role: "STUDENT",
};

export default function Profile() {
  // To test the other view, change this initial state to `mockUserProfile`
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching the profile
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleSetRole = (role) => {
    // Instead of calling a database, we just update our local state.
    setProfile({ email: "testuser@example.com", role: role });
  };

  if (loading) {
    return <p className="text-center p-10 text-xl">Loading your profile...</p>;
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-2xl text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg mb-6">
          Welcome, <span className="font-semibold">testuser@example.com</span>!
        </p>

        {profile ? (
          // If a profile exists, show the user's role
          <div>
            <p className="text-xl text-gray-700">Your role is set as:</p>
            <p className="text-3xl font-bold text-blue-600 mt-2 capitalize">
              {profile.role.toLowerCase()}
            </p>
          </div>
        ) : (
          // If no profile exists, show role selection buttons
          <div>
            <p className="text-xl text-gray-700 mb-4">To get started, please select your role.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSetRole('STUDENT')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg text-lg"
              >
                I am a Student
              </button>
              <button
                onClick={() => handleSetRole('PROFESSOR')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-lg"
              >
                I am a Professor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}