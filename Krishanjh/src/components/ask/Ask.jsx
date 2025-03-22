import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img55 from "../../assets/Rectangle 55.png";
import img59 from "../../assets/Rectangle 59.png";

export default function Ask() {
  const navigate = useNavigate();

  const goToFarmerForm = () => {
    console.log("Navigating to farmer form");
    navigate("/farmer-form");
  };

  const goToBuyerForm = () => {
    console.log("Navigating to buyer form");
    navigate("/buyer-form");
  };

  return (
    <div className="min-h-screen bg-[#0f261d] flex flex-col items-center">

      <div className="flex justify-center items-center mt-40 gap-16">
        {/* Farmer Card */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-green-100 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          onClick={goToFarmerForm}
        >
          <img
            src={img55}
            alt="Farmer"
            className="w-[400px] h-[400px] object-cover"
          />
          <div className="text-center py-4 text-2xl font-semibold">FARMER</div>
        </motion.div>

        {/* Buyer Card */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-blue-100 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
          onClick={goToBuyerForm}
        >
          <img
            src={img59}
            alt="Buyer"
            className="w-[400px] h-[400px] object-cover"
          />
          <div className="text-center py-4 text-2xl font-semibold">BUYER</div>
        </motion.div>
      </div>
    </div>
  );
}
