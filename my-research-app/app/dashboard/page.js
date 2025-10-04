"use client";
import { useState, useEffect } from 'react';

// This is our hardcoded "dummy" data.
const mockProjects = [
  {
    id: '1',
    title: 'AI Research on Quantum Computing',
    description: 'A fascinating project exploring the intersection of AI and quantum mechanics. No prior quantum experience needed.'
  },
  {
    id: '2',
    title: 'Web App for Local Non-Profits',
    description: 'Build a full-stack application to help charities in the community manage their volunteers.'
  },
  {
    id: '3',
    title: 'Data Analysis of Climate Change Trends',
    description: 'Work with a large dataset to identify patterns and create visualizations related to global climate data.'
  }
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We simulate a network delay, then load our mock data.
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 500); // 0.5 second delay
  }, []);

  if (loading) return <p className="text-center p-10 text-xl">Loading projects...</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Research Opportunities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-700 mb-4">{project.description}</p>
            </div>
            <button
              onClick={() => alert("This would apply to project: " + project.title)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}