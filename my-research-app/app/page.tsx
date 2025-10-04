import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to ResearchConnect
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The platform to connect students with research opportunities.
      </p>
      <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-200">
        View Opportunities
      </Link>
    </div>
  );
}