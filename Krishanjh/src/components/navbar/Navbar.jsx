// components/Navbar.js
import { motion } from "framer-motion";
import { useState } from "react";
import { FaComments, FaGlobe, FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const translations = {
  en: {
    home: "Home",
    education: "Education",
    about: "About",
    support: "Support",
    faq: "FAQ",
    callUs: "Call Us",
    profile: "Profile",
    slogan: "Grow with Innovation",
    language: "English",
  },
  hi: {
    home: "होम",
    education: "शिक्षा",
    about: "हमारे बारे में",
    support: "सहायता",
    faq: "सामान्य प्रश्न",
    callUs: "हमें कॉल करें",
    profile: "प्रोफ़ाइल",
    slogan: "नवाचार के साथ बढ़ें",
    language: "हिंदी",
  },
};

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [language, setLanguage] = useState("en");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const handleLogout = () => {
    if (logout) {
      logout();  // Call the logout function from context
      console.log("User logged out");
    } else {
      // Fallback if context logout function is unavailable
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('userData');
      console.log("Manually cleared localStorage");
    }
    navigate('/');
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    
    // Check localStorage directly for token and user type
    const token = localStorage.getItem('token');
    const currentUserType = localStorage.getItem('userType');
    
    console.log("Token exists:", !!token);
    console.log("Current userType:", currentUserType);
    
    // Only proceed if token exists
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate('/farmer-form');
      return;
    }
    
    if (currentUserType === 'farmer') {
      console.log("Navigating to farmer profile");
      navigate('/farmer-profile');
    } else if (currentUserType === 'buyer') {
      console.log("Navigating to buyer profile");
      navigate('/buyer-profile');
    } else if (currentUserType === 'true') {
      // Handle legacy format where true = buyer
      console.log("Legacy format detected (true = buyer)");
      navigate('/buyer-profile');
    } else if (currentUserType === 'false') {
      // Handle legacy format where false = farmer
      console.log("Legacy format detected (false = farmer)");
      navigate('/farmer-profile');
    } else {
      console.log("Unknown user type, redirecting to login");
      navigate('/farmer-form');
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r bg-[#243F32] to-green-900 shadow-2xl z-50 overflow-hidden"
    >
      <div className="flex justify-between items-center py-6 px-10 relative">
        {/* Logo with Hover Effect */}
        <Link
          to="/"
          className="text-4xl font-extrabold text-white tracking-wide relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          KRISAANJH
          {isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-6 left-0 text-sm bg-yellow-400 px-2 py-1 rounded"
            >
              {translations[language].slogan}
            </motion.div>
          )}
        </Link>

        {/* Navigation Links with Sliding Effect */}
        <ul className="flex gap-12 text-white text-xl">
          {["home", "education"].map(
            (key, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer transition-transform relative"
              >
                <Link to={`/${key === "home" ? "" : key}`}>
                  {translations[language][key]}
                </Link>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.li>
            )
          )}
          
          {/* About Link */}
          <motion.li
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer transition-transform relative"
          >
            <Link to="/about-contract-farming">
              {translations[language].about}
            </Link>
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.li>

          {["support", "faq"].map(
            (key, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer transition-transform relative"
              >
                <Link to={`/${key}`}>
                  {translations[language][key]}
                </Link>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.li>
            )
          )}
        </ul>

        {/* Contact and Profile */}
        <div className="flex gap-8 items-center">
          {user ? (
            <>
       
     
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-green-300">
                Register
              </Link>
            </>
          )}

          <button className="flex items-center gap-2 text-white hover:scale-110 transition-transform">
            <FaPhoneAlt /> {translations[language].callUs}
          </button>

          <button
            className="flex items-center gap-2 text-white hover:scale-110 transition-transform"
            onClick={toggleLanguage}
          >
            <FaGlobe /> {translations[language].language}
          </button>

          <div className="relative ml-4">
            <div
              className="cursor-pointer"
              onClick={handleProfileClick}
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white text-xl">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
