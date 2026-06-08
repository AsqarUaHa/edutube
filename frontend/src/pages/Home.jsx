import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Header Section */}
      <header className="text-center mb-12">
        <div className="text-6xl font-extrabold text-gray-800 mb-4">Welcome to EduTube</div>
        <p className="text-xl text-gray-600">
          Empowering you with tools and resources to enhance your learning experience.
        </p>
        <div className="flex space-x-4 mt-6 justify-center">
          {/* Button for Exploring PDF Tools */}
          <button 
            className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={() => navigate('/pdf')}
          >
            PDF Tools & Summarizer
          </button>
          {/* Button for AI Learning */}
          <button 
            className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            onClick={() => navigate('/learn')}
          >
            Basic AI Learning
          </button>
          {/* Button for Interactive Quizzes */}
          <button 
            className="bg-purple-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
            onClick={() => navigate('/audio')}
          >
            Learn from Audio lessons
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-4xl mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Interactive Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with our engaging and interactive quizzes on various topics.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Comprehensive Learning Resources</h3>
            <p className="text-gray-600">
              Access a wide range of resources and materials to help you learn and grow.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Personalized Learning Experience</h3>
            <p className="text-gray-600">
              Customize your learning journey with tailored recommendations and tools.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-sage-100 p-8 rounded-lg shadow-lg border border-gray-200 w-full max-w-4xl mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-lg text-gray-600">
          <li className="mb-4">Expertly crafted content and quizzes.</li>
          <li className="mb-4">User-friendly interface and seamless experience.</li>
          <li className="mb-4">Continuous updates and improvements.</li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Join us now and make the most of our platform. Your learning journey starts here.
        </p>
        <button 
          className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          onClick={() => navigate('/pdf')}
        >
          Start Exploring Now
        </button>
      </section>

    </div>
  );
}

export default Home;
