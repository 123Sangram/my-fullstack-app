







import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import "./ImageSlider.css";

const ImageSlider = ({ images, content, delay = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, [delay, images.length]);

  return (
    <div className="relative group w-full h-screen overflow-hidden">
      {/* Background Images with Fade */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
            index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
<h1
  className="
    text-white font-medium
    text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-4
    opacity-0 translate-y-8 scale-95
    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
    transition-all duration-[2000ms] ease-out delay-300
    drop-shadow-[0_5px_20px_rgba(0,0,0,0.8)]
    tracking-[-1px] font-sans
  "
>
  {content[currentIndex]}
</h1>

      </div>

      {/* Floating Chat Icon */}
      <Link to="/chatbot">
        <div className="fixed bottom-8 right-8 bg-[#215A37] p-3 rounded-full shadow-lg cursor-pointer z-20">
          <ChatIcon className="text-white text-4xl" />
        </div>
      </Link>
    </div>
  );
};

export default ImageSlider;
