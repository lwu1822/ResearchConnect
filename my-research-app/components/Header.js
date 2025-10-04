"use client";
import Link from 'next/link';

export default function Header() {
  // We've removed the 'useAuthenticator' hook for now.
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
          ResearchConnect
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link>
          <Link href="/create-project" className="text-gray-600 hover:text-blue-500">Post a Project</Link>
          <Link href="/profile" className="text-gray-600 hover:text-blue-500">Profile</Link>
          {/* The Sign Out button is hidden when no user is logged in */}
        </div>
      </nav>
    </header>
  );
}