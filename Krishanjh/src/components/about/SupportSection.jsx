// components/SupportSection.js
import { motion } from "framer-motion";

export default function SupportSection() {
  return (
    <div className="min-h-screen bg-green-900 p-10 text-white flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold mb-8"
      >
        We're Here to Help
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="max-w-4xl text-lg text-center mb-12"
      >
        Have questions or need assistance? Our dedicated support team is
        available 24/7 to ensure your contract farming experience is seamless
        and successful.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {["Live Chat Support", "Email Assistance", "Phone Support"].map(
          (supportType, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl p-6"
            >
              <h3 className="text-3xl font-semibold mb-4">{supportType}</h3>
              <p className="text-lg mb-6">
                Our team is here to provide real-time solutions and expert
                guidance.
              </p>
              <button className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition-transform transform hover:scale-105">
                Get Support
              </button>
            </div>
          )
        )}
      </motion.div>

      <button className="mt-12 bg-green-600 hover:bg-green-800 text-white px-8 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-110">
        Contact Us
      </button>
    </div>
  );
}
