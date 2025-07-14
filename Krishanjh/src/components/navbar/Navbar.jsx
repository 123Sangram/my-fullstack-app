




import { motion } from "framer-motion";
import { useState } from "react";
import { FaBars, FaGlobe } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const translations = {
  en: {
    home: "Home",
    education: "Education",
    about: "About",
    support: "Support",
    faq: "FAQ",
    callUs: "Call Us",
    slogan: "Grow with Innovation",
    language: "English",
    login: "Login",
    register: "Register",
  },
  hi: {
    home: "होम",
    education: "शिक्षा",
    about: "हमारे बारे में",
    support: "सहायता",
    faq: "सामान्य प्रश्न",
    callUs: "हमें कॉल करें",
    slogan: "नवाचार के साथ बढ़ें",
    language: "हिंदी",
    login: "लॉगिन",
    register: "रजिस्टर",
  },
};

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleProfileClick = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    const userType = localStorage.getItem("userType");
    navigate(userType === "true" ? "/buyer-profile" : "/farmer-profile");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/frontpage");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full bg-[#243F32] shadow-2xl z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          to="/frontpage"
          onClick={handleHomeClick}
          className="text-2xl md:text-3xl font-extrabold text-white tracking-wide relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          KRISAANJH
          {isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -top-6 left-0 text-xs md:text-sm bg-yellow-400 px-2 py-1 rounded"
            >
              {translations[language].slogan}
            </motion.div>
          )}
        </Link>

        {/* Center: Nav Links */}
        <ul className="hidden md:flex gap-8 text-lg">
          {["home", "education", "about", "support", "faq"].map((key) => (
            <li key={key} className="relative group">
              <Link
                to={
                  key === "home"
                    ? "/frontpage"
                    : key === "about"
                    ? "/about-contract-farming"
                    : `/${key}`
                }
                className="text-white transition"
              >
                {translations[language][key]}
              </Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Right: Call Us, Language, Profile */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          <button className="relative group">
            <span className="text-white transition">{translations[language].callUs}</span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </button>

          <button
            onClick={toggleLanguage}
            className="relative group flex items-center gap-1"
          >
            <span className="text-white transition flex items-center gap-1">
              <FaGlobe /> {translations[language].language}
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </button>

          <div
            className="cursor-pointer"
            onClick={handleProfileClick}
          >
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-600 flex items-center justify-center text-white text-lg">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </div>

        {/* Hamburger for Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white text-2xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#243F32] text-white text-lg flex flex-col py-4 px-4 space-y-2">
          {["home", "education", "about", "support", "faq"].map((key) => (
            <Link
              key={key}
              to={
                key === "home"
                  ? "/frontpage"
                  : key === "about"
                  ? "/about-contract-farming"
                  : `/${key}`
              }
              className="border-b border-green-700 pb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {translations[language][key]}
            </Link>
          ))}

          <button className="border-b border-green-700 pb-2 text-left">
            {translations[language].callUs}
          </button>

          <button
            onClick={() => {
              toggleLanguage();
              setIsMenuOpen(false);
            }}
            className="border-b border-green-700 pb-2 text-left flex items-center gap-1"
          >
            <FaGlobe /> {translations[language].language}
          </button>

          <div
            className="flex items-center gap-2 pt-2"
            onClick={() => {
              handleProfileClick();
              setIsMenuOpen(false);
            }}
          >
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-lg">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
            <span>Profile</span>
          </div>
        </div>
      )}
    </motion.nav>
  );
}

