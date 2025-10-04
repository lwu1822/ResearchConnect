"use client";
import { useState, useEffect, useCallback } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

type Profile = Schema['Profile']['type'];

export default function Profile() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    try {
      const { data: profiles, errors } = await client.models.Profile.list();
      if (errors) throw errors;
      if (profiles.length > 0) {
        setProfile(profiles[0]);
      }
    } catch (err) { console.error("Error fetching profile", err); }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // FIX #1: Use the simple string union type here
  const handleSetRole = async (role: 'STUDENT' | 'PROFESSOR') => {
    try {
      const { data: newProfile, errors } = await client.models.Profile.create({
        email: user.signInDetails?.loginId,
        role: role,
      });
      if (errors) throw errors;
      setProfile(newProfile);
    } catch (err) { console.error("Error creating profile", err); }
  };

  if (loading) return <p className="p-10 text-center text-xl">Loading profile...</p>;

  return (
    <div className="container mx-auto px-6 py-8 max-w-2xl text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg mb-6">Welcome, <span className="font-semibold">{user.signInDetails?.loginId}</span>!</p>
        {profile ? (
          <div>
            <p className="text-xl">Your role is:</p>
            <p className="text-3xl font-bold text-blue-600 mt-2 capitalize">{profile.role.toLowerCase()}</p>
          </div>
        ) : (
          <div>
            <p className="text-xl mb-4">Please select your role.</p>
            <div className="flex justify-center space-x-4">
              {/* FIX #2: Use simple strings in the onClick */}
              <button onClick={() => handleSetRole('STUDENT')} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg">I am a Student</button>
              <button onClick={() => handleSetRole('PROFESSOR')} className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg">I am a Professor</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}