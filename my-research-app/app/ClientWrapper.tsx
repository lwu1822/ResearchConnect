"use client";
import { Amplify } from 'aws-amplify';
// This import is the key change for Gen 2
import amplifyconfig from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import Header from '../components/Header';

// This configures your frontend to use the live backend
Amplify.configure(amplifyconfig);

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <Header />
        <main className="bg-gray-50 min-h-screen">
          {children}
        </main>
      </Authenticator>
    </Authenticator.Provider>
  );
}