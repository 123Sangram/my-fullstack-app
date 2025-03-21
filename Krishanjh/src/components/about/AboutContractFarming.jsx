// components/AboutContractFarming.js
import { motion } from "framer-motion";

const slides = [
  {
    title: "Introduction to Contract Farming",
    content:
      "Understand the basics of contract farming and how it benefits both farmers and buyers.",
    image:
      "https://www.tractorjunction.com/blog/wp-content/uploads/2020/03/Contract-Farming-in-India-Benefits-of-Contract-Farming.jpg",
    video: "https://www.youtube.com/embed/8xZq1j4dyX8",
  },
  {
    title: "Benefits of Contract Farming",
    content:
      "Learn how contract farming ensures financial security and better resource management.",
    image:
      "https://www.indiafilings.com/learn/wp-content/uploads/2019/06/Contract-farming.jpg",
    video: "https://www.youtube.com/embed/P1p6tZlWy9E",
  },
  {
    title: "How to Start Contract Farming",
    content:
      "Step-by-step guidance on setting up successful contract farming agreements.",
    image:
      "https://sprightagro.com/wp-content/uploads/2020/04/AdobeStock_609065032-scaled.jpeg",
    video: "https://www.youtube.com/embed/kHCRPHEZq-A",
  },
];

const AboutContractFarming = () => {
  return (
    <div className="min-h-screen bg-[#243F32] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Understanding Contract Farming
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            A modern approach to agricultural production that benefits both
            farmers and buyers
          </p>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#215A37] mb-2">
                  {slide.title}
                </h3>
                <p className="text-gray-600 mb-4">{slide.content}</p>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={slide.video}
                    title={slide.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full rounded"
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#215A37] mb-4">
              What is Contract Farming?
            </h2>
            <p className="text-gray-700 mb-4">
              Contract farming is an agricultural production system where
              farmers and buyers enter into a formal agreement before the
              production of agricultural goods. This agreement typically
              includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Production specifications and quality standards</li>
              <li>Pricing arrangements</li>
              <li>Timeline for delivery</li>
              <li>Input supply arrangements</li>
              <li>Technical support provisions</li>
            </ul>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#215A37] mb-4">
              Benefits of Contract Farming
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-[#215A37] mb-2">
                  For Farmers
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Guaranteed market access</li>
                  <li>Stable income</li>
                  <li>Access to modern technology</li>
                  <li>Technical support and training</li>
                  <li>Reduced market risks</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-[#215A37] mb-2">
                  For Buyers
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Quality control</li>
                  <li>Regular supply</li>
                  <li>Cost efficiency</li>
                  <li>Market stability</li>
                  <li>Long-term partnerships</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-[#215A37] mb-4">
            How to Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-[#215A37] mb-2">
                1. Registration
              </h3>
              <p className="text-gray-700">
                Create an account on our platform and complete your profile with
                necessary details.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#215A37] mb-2">
                2. Contract Creation
              </h3>
              <p className="text-gray-700">
                Define your requirements and create a contract with specific
                terms and conditions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#215A37] mb-2">
                3. Implementation
              </h3>
              <p className="text-gray-700">
                Monitor progress, provide support, and ensure successful
                contract execution.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Ready to Start Contract Farming?
          </h2>
          <p className="text-gray-200 mb-6">
            Join our platform to connect with reliable partners and grow your
            business.
          </p>
          <button className="bg-[#215A37] text-white px-8 py-3 rounded-lg hover:bg-[#1a4729] transition-colors">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutContractFarming;
