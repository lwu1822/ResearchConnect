"use client";
import { useState, useEffect } from 'react';
import type { Schema } from '../../amplify/data/resource';
// STEP 1: Import the new 'generateClient' function
import { generateClient } from 'aws-amplify/data';

// STEP 2: Create a new, typed client outside your component
const client = generateClient<Schema>();

// Define a type for our project object
type Project = Schema['Project']['type'];

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      // STEP 3: Use the new, simpler client syntax
      const { data: projects, errors } = await client.models.Project.list();
      if (errors) throw errors;
      setProjects(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApply(projectId: string) {
    try {
      // STEP 4: Use the new client syntax for creating data
      const { data, errors } = await client.models.Application.create({ projectId });
      if (errors) throw errors;
      alert('Successfully applied!');
    } catch (error) {
      console.error('Error applying to project:', error);
      alert('Error: You may have already applied.');
    }
  }

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
              onClick={() => handleApply(project.id)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}