import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import "./ImageSlider.css";

const ImageSlider = ({ images, content, delay = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWidth = container.clientWidth;

    const scrollToNextImage = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        container.scrollTo({
          left: scrollWidth * newIndex,
          behavior: "smooth",
        });
        return newIndex;
      });
    };

    const interval = setInterval(scrollToNextImage, delay);

    return () => clearInterval(interval);
  }, [delay, images.length]);

  return (
    <div className="relative top-20 w-full h-full overflow-hidden">
      {/* Line above the image */}
      {/* Slider Container */}
      <div className="slider-container" ref={containerRef}>
        <div
          className="slider-content h-[800px]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="slide relative w-full flex-shrink-0">
              {/* Image */}
              <img
                className="slider-image w-full h-[1000px] object-cover"
                src={src}
                alt={`Slide ${index + 1}`}
              />

              {/* Content Overlay */}
              <div className="content-overlay  pb-[350px]">
                <div className="content-text text-[70px] font-semibold">
                  {content[index]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link to="/chatbot">
        <div className="fixed bottom-8 right-8  bg-[#215A37] p-3 rounded-full shadow-lg cursor-pointer">
          <ChatIcon className="text-white text-4xl" />
        </div>
      </Link>
      ;
    </div>
  );
};

export default ImageSlider;
