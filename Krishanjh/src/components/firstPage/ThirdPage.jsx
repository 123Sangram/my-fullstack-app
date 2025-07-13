// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { FaYoutube } from "react-icons/fa";
// import img1 from "../../assets/image 5.png";
// import img2 from "../../assets/image 6.png";
// import img3 from "../../assets/image 7.png";

// const ThirdPage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const items = [
//     {
//       src: img1,
//       title: "Agricultural Safety",
//       description:
//         "Training farmers, ranchers, and tree farmers to operate machinery safely and use protective equipment correctly can help reduce the high number of accidents.",
//       link: "https://youtu.be/YK3LquuKj6E?si=G6XNbAeEsKA3pT00",
//     },
//     {
//       src: img2,
//       title: "Organic Agriculture",
//       description:
//         "Organic agriculture focuses on sustainable farming practices that prioritize soil health, biodiversity, and the avoidance of synthetic chemicals.",
//       link: "https://www.youtube.com/watch?v=wougJaN_Ha0&pp=ygUcb3JnYW5pYyBhZ3JpY3VsdHVyZSBmYXJtaW5nIA%3D%3D",
//     },
//     {
//       src: img3,
//       title: "Agriculture Technology",
//       description:
//         "Agricultural technology, or AgriTech, is revolutionizing farming by integrating advanced tools such as precision agriculture, IoT, and AI to optimize crop production and resource management.",
//       link: "https://www.youtube.com/watch?v=DoVGbPa0jHw&t=330s&pp=ygUfYWdyaWN1bHR1cmUgZmFybWluZyB0ZWNobm9sb2d5IA%3D%3D",
//     },
//     {
//       src: img1,
//       title: "Agricultural Safety",
//       description:
//         "Training farmers, ranchers, and tree farmers to operate machinery safely and use protective equipment correctly can help reduce the high number of accidents.",
//       link: "https://www.youtube.com/watch?v=PsSNBiBqVtI&list=PL5FjdkloWJydmiYGfricCpNJ0eFAEDF3V",
//     },
//     {
//       src: img2,
//       title: "Organic Agriculture",
//       description:
//         "Organic agriculture focuses on sustainable farming practices that prioritize soil health, biodiversity, and the avoidance of synthetic chemicals.",
//       link: "https://www.youtube.com/watch?v=wougJaN_Ha0&pp=ygUcb3JnYW5pYyBhZ3JpY3VsdHVyZSBmYXJtaW5nIA%3D%3D",
//     },
//     {
//       src: img1,
//       title: "Agricultural Safety",
//       description:
//         "Training farmers, ranchers, and tree farmers to operate machinery safely and use protective equipment correctly can help reduce the high number of accidents.",
//       link: "https://www.youtube.com/watch?v=PsSNBiBqVtI&list=PL5FjdkloWJydmiYGfricCpNJ0eFAEDF3V",
//     },
    
//   ];

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? items.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="h-[900px] bg-[#243F32]">
//       <center className="pt-10" data-aos="fade-up">
//         <h1 className="text-6xl font-semibold text-white">EDUCATION</h1>
//       </center>
//       <div className="relative w-full overflow-hidden pt-20 mx-auto px-20">
//         <div className="flex justify-between items-center">
//           <button
//             onClick={prevSlide}
//             className="absolute left-4 rounded-full z-10 bg-[#93B6B1] text-black font-bold text-[25px] px-[22px] py-3 hover:bg-gray-600"
//           >
//             &lt;
//           </button>

//           <div
//             className="flex transition-transform duration-700 ease-in-out"
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           >
//             {items.map((item, index) => (
//               <div
//                 key={index}
//                 className="w-full md:w-1/3 px-4 flex-shrink-0 flex flex-col items-center"
//                 data-aos="fade-up"
//               >
//                 <div className="relative bg-white rounded-[30px] h-[550px] border shadow-lg p-4">
//                   <a href={item.link} target="_blank" rel="noopener noreferrer">
//                     <img
//                       src={item.src}
//                       alt={item.title}
//                       className="w-full h-60 mt-5 object-cover rounded-lg"
//                     />
//                   </a>
//                   <FaYoutube className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 mt-[-130px] text-5xl pointer-events-none" />
//                   <h1 className="text-3xl font-semibold mt-6 text-center text-gray-800">
//                     {item.title}
//                   </h1>
//                   <p className="text-[21px] text-center text-gray-600 mt-2">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={nextSlide}
//             className="absolute right-4 z-10 bg-[#93B6B1] rounded-full text-black font-bold text-[25px] px-[22px] py-3 hover:bg-gray-600"
//           >
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThirdPage;















import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaYoutube } from "react-icons/fa";
import img1 from "../../assets/image 5.png";
import img2 from "../../assets/image 6.png";
import img3 from "../../assets/image 7.png";

const ThirdPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const items = [
    {
      src: img1,
      title: "Agricultural Safety",
      description:
        "Training farmers, ranchers, and tree farmers to operate machinery safely and use protective equipment correctly can help reduce the high number of accidents.",
      link: "https://youtu.be/YK3LquuKj6E?si=G6XNbAeEsKA3pT00",
    },
    {
      src: img2,
      title: "Organic Agriculture",
      description:
        "Organic agriculture focuses on sustainable farming practices that prioritize soil health, biodiversity, and the avoidance of synthetic chemicals.",
      link: "https://www.youtube.com/watch?v=wougJaN_Ha0",
    },
    {
      src: img3,
      title: "Agriculture Technology",
      description:
        "AgriTech integrates precision agriculture, IoT, and AI to optimize crop production and resource management.",
      link: "https://www.youtube.com/watch?v=DoVGbPa0jHw",
    },
    {
      src: img1,
      title: "Agricultural Safety",
      description:
        "Training farmers, ranchers, and tree farmers to operate machinery safely and use protective equipment correctly can help reduce the high number of accidents.",
      link: "https://www.youtube.com/watch?v=PsSNBiBqVtI",
    },
    {
      src: img2,
      title: "Organic Agriculture",
      description:
        "Organic agriculture focuses on sustainable farming practices that prioritize soil health, biodiversity, and the avoidance of synthetic chemicals.",
      link: "https://www.youtube.com/watch?v=wougJaN_Ha0",
    },
    {
      src: img3,
      title: "Agriculture Technology",
      description:
        "AgriTech integrates precision agriculture, IoT, and AI to optimize crop production and resource management.",
      link: "https://www.youtube.com/watch?v=DoVGbPa0jHw",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Calculate visible items with wrap-around
  const visibleItems = [];
  for (let i = 0; i < cardsPerView; i++) {
    visibleItems.push(items[(currentIndex + i) % items.length]);
  }

  return (
    <div className="min-h-[900px] bg-[#243F32] py-16">
      <center data-aos="fade-up">
        <h1 className="text-4xl md:text-6xl font-semibold text-white mb-10">
          EDUCATION
        </h1>
      </center>
      <div className="relative w-full overflow-hidden mx-auto px-4 md:px-20">
        <div className="flex justify-between items-center">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 rounded-full z-10 bg-[#93B6B1] text-black font-bold text-[25px] px-[18px] py-3 hover:bg-gray-600"
          >
            &lt;
          </button>

          {/* Cards Container */}
          <div className="flex w-full transition-transform duration-700 ease-in-out">
            {visibleItems.map((item, index) => (
              <div
                key={index}
                className="px-2 flex-shrink-0"
                style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                data-aos="fade-up"
              >
                <div className="relative bg-white rounded-[20px] h-[480px] md:h-[550px] border shadow-lg p-4">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-48 md:h-60 mt-4 object-cover rounded-lg"
                    />
                  </a>
                  <FaYoutube className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-4xl md:text-5xl pointer-events-none" />
                  <h1 className="text-xl md:text-3xl font-semibold mt-4 text-center text-gray-800">
                    {item.title}
                  </h1>
                  <p className="text-[16px] md:text-[20px] text-center text-gray-600 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 rounded-full z-10 bg-[#93B6B1] text-black font-bold text-[25px] px-[18px] py-3 hover:bg-gray-600"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;

