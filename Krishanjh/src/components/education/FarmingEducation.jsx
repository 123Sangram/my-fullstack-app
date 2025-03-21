// FarmingEducation.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {slides} from './slides';

export default function FarmingEducation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl font-extrabold text-white mb-12 text-center animate-pulse">
        Empower Your Farm with Knowledge
      </h1>

      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white p-10 flex"
      >
        <div className="w-1/2 pr-8 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold text-green-800 mb-6">
            {slides[currentSlide].title}
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            {slides[currentSlide].content}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={nextSlide}
              className="bg-green-600 hover:bg-green-800 text-white px-8 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-110"
            >
              Next Tip
            </button>
            <Link
              to={`/videos/${currentSlide}`}
              className="bg-blue-600 hover:bg-blue-800 text-white px-8 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-110"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="rounded-xl w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <p className="mt-12 text-white max-w-3xl text-center text-lg">
        Join our contract farming platform to unlock expert insights and boost
        your farm’s profitability with modern practices.
      </p>
    </div>
  );
}
