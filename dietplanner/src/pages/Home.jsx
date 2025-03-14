import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Smart Diet Planner</h1>
      <p className="text-lg text-gray-700 mb-6">
        Plan your meals efficiently and stay healthy with our AI-powered diet recommendations.
      </p>

      <div className="flex gap-4">
        <Link to="/signup" className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600">
          Get Started
        </Link>
        <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600">
          Login
        </Link>
      </div>

      <img src="/diet.png" alt="Healthy Food" className="mt-8 w-80 rounded-md shadow-md" />
    </div>
  );
};

export default Home;
