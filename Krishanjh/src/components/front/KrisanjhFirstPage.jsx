import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// import background from "../../../public/images/Spright-Agro-Banner-1-scaled.jpeg";
const KrisanjhFirstPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute inset-0 bg-[url('./../../public/images/Spright-Agro-Banner-2-scaled.jpeg')] bg-cover bg-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.8, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold text-white mb-6">
                Welcome to Krisanjh
              </h1>
              <p className="text-xl text-white mb-8">
                Empowering Farmers with Technology and Knowledge
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/ask"
                  className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-green-800 transition-colors"
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white bg-opacity-90">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
              Why Choose Krisanjh?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-green-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Farming Journey?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of farmers who are already benefiting from Krisanjh
            </p>
            <Link
              to="/ask"
              className="bg-white text-green-800 px-8 py-3 rounded-full hover:bg-green-50 transition-colors inline-block"
            >
              Start Your Journey Today
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

const features = [
  {
    icon: '🌾',
    title: 'Smart Farming Solutions',
    description: 'Access modern farming techniques and technologies to increase your yield.',
  },
  {
    icon: '📱',
    title: 'Digital Platform',
    description: 'Manage your farm operations digitally with our user-friendly platform.',
  },
  {
    icon: '🤝',
    title: 'Community Support',
    description: 'Connect with other farmers and share experiences and knowledge.',
  },
];

export default KrisanjhFirstPage; 