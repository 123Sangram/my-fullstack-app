import { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is contract farming?",
    answer:
      "Contract farming is an agreement between farmers and buyers where production is carried out under a predetermined agreement. It helps farmers secure a market and receive better support.",
  },
  {
    question: "What are the benefits for farmers?",
    answer:
      "Farmers benefit from guaranteed market access, technical support, and reduced financial risks through contract farming.",
  },
  {
    question: "How can I get started with contract farming?",
    answer:
      "To start, connect with a reliable buyer, understand the contract terms, and ensure you have the necessary resources to meet the production requirements.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#243F32] to-yellow-500 p-10 text-white relative">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold mb-12 text-center"
      >
        Frequently Asked Questions
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className={`rounded-2xl overflow-hidden shadow-lg ${
              openIndex === index
                ? "bg-gradient-to-r from-purple-600 to-blue-500"
                : "bg-white text-gray-900"
            }`}
          >
            <button
              className="w-full text-left p-6 text-2xl font-semibold focus:outline-none flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-4xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-6 text-lg border-t border-gray-300">
                {faq.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-10 right-10 bg-blue-600 hover:bg-blue-800 text-white px-8 py-3 rounded-xl shadow-xl transition-transform transform hover:scale-110 cursor-pointer"
      >
        Need More Help?
      </motion.div>
    </div>
  );
}
