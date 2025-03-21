// VideoPage.jsx
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {slides}  from "./slides";

export default function VideoPage() {
  const { slideIndex } = useParams();
  const index = parseInt(slideIndex, 10);

  if (isNaN(index) || index < 0 || index >= slides.length) {
    return <p className="text-3xl text-red-600">Invalid video selection!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-blue-800 mb-8">
        Learn Farming Through Videos
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl w-full"
      >
        <iframe
          width="100%"
          height="600"
          src={slides[index].video}
          title={slides[index].title}
          frameBorder="0"
          allowFullScreen
          className="rounded-xl shadow-xl"
        ></iframe>
      </motion.div>
      <Link
        to="/"
        className="mt-12 bg-green-600 hover:bg-green-800 text-white px-8 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-110"
      >
        Back to Education
      </Link>
    </div>
  );
}
