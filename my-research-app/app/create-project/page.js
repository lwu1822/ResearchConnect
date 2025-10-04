"use client";
import { useState } from 'react';
// We are NOT importing from aws-amplify or ../../src/graphql/mutations

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setLoading(true);
    // Simulate a network delay
    setTimeout(() => {
      // Instead of calling a database, we just show an alert.
      alert(`Project "${title}" created successfully! (This is a mock action)`);
      setTitle('');
      setDescription('');
      setLoading(false);
    }, 500); // 0.5 second delay
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
            rows="6"
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