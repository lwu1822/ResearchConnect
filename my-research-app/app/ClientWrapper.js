"use client";
import Header from '../components/Header';

// Note: We are NOT importing Amplify or the Authenticator for now.

export default function ClientWrapper({ children }) {
  return (
    // We are returning the Header and children directly,
    // without the Authenticator wrapper.
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
    </>
  );
}