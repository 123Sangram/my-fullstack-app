import ChatIcon from "@mui/icons-material/Chat";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // useNavigate add किया
import market2 from "../../assets/Group 1000000891.png";
import market3 from "../../assets/environmental-law_9587611 1.png";
import market1 from "../../assets/market_862856 1.png";
import market4 from "../../assets/paper_1673996 1.png";

const MidPage = () => {
  const navigate = useNavigate(); // useNavigate hook add किया

  const handleNavigation = (path) => {
    navigate(path); // Direct navigation without any checks
  };

  const items = [
    {
      title: "Market",
      src: market1,
      description:
        "Meet the farmers behind your food and enjoy produce grown with care and passion.",
      link: "/MarketTrendAnalyzer",
    },
    {
      title: "Chat",
      src: market2,
      description:
        "Meet the growers behind your food and get firsthand answers to all your questions.",
      link: "/chatbot",
    },
    {
      title: "Legal",
      src: market3,
      description:
        "Trust in agreements that are legally binding and endorsed by government regulations for your peace of mind.",
      link: "/legal",
    },
    {
      title: "Contracts",
      src: market4,
      description:
        "Eliminate uncertainty with contracts that detail every aspect of your transaction, fostering trust and transparency.",
      link: "/contract",
    },
  ];

  return (
    <div className="h-[300px] bg-[#E5FFEF]">
      <div className="absolute w-full overflow-hidden mt-[-170px] px-4 sm:px-10 lg:px-20">
        <div className="flex justify-between items-center">
          <div className="flex w-full transform transition-transform duration-700 ease-in-out">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="w-1/4 px-2 sm:px-4"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavigation(item.link)} // Changed to direct navigation
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileTap={{ scale: 1.1 }}
                  className="bg-[#243F32] rounded-[15px] h-[400px] border-[1px] border-[#bbbfbd] shadow-lg p-4 cursor-pointer"
                >
                  <p className="text-[18px] sm:text-[21px] text-center text-white font-semibold mt-6">
                    {item.title}
                  </p>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-[100px] h-[100px] mx-auto mt-12 object-contain rounded-lg"
                  />
                  <p className="text-[13px] sm:text-[15px] text-center text-white mt-16">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Chat Icon - Direct Navigation */}
      <motion.div
        className="fixed bottom-8 right-8 bg-[#215A37] p-3 rounded-full shadow-lg cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleNavigation("/chatbot")} // Changed to direct navigation
      >
        <ChatIcon className="text-white text-4xl" />
      </motion.div>
    </div>
  );
};

export default MidPage;
