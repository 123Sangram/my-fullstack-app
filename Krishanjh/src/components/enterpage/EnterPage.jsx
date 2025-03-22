import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import slide1 from '../../assets/images/Spright-Agro-Banner-1-scaled.jpeg';
import slide2 from "../../assets/images/Spright-Agro-banner-2-scaled.jpeg";
import slide3 from '../../assets/images/Spright-Agro-banner-3-scaled.jpeg';

const EnterPage = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = [slide1, slide2, slide3];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Navbar */}
 

      {/* Background Images */}
      {images.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentImage === index ? 1 : 0,
            scale: currentImage === index ? 1.1 : 1,
          }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: currentImage === index ? 1 : 0,
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-[2]"></div>

      {/* Main Content */}
      <div className="relative z-[3] flex-1 flex flex-col items-center justify-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold text-white mb-4 text-center"
        >
          Welcome to Krisanjh
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-white mb-8 text-center"
        >
          Empowering Farmers with Technology and Knowledge
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate('/ask')}
            className="px-6 py-3 bg-[#22C55E] text-white rounded-full hover:bg-green-600 transition-colors text-lg"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/ask')}
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors text-lg"
          >
            Register Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default EnterPage;