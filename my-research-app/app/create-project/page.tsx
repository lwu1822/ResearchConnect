"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

// Create the client instance
const client = generateClient<Schema>();

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Updated function with real API call and TypeScript type
  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) return;

    setLoading(true);
    try {
      // This is the new, live API call
      const { data, errors } = await client.models.Project.create({
        title: title,
        description: description,
      });

      if (errors) throw errors;

      alert('Project created successfully!');
      router.push('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Ensure you have a Professor role.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a New Opportunity</h1>
      <form onSubmit={handleCreateProject} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Project Title</label>
          <input
            id="title"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description & Requirements</label>
          <textarea
            id="description"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}