// import React, { useEffect } from "react";
// import { IoLocationSharp } from "react-icons/io5";
// import { FaPhone } from "react-icons/fa6";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "./Footer.css";
// import back from "../../assets/Asset 1@4x 1.png";
// import foot from "../../assets/WhatsApp Image 2024-08-29 at 13.57.16_251b7f48 footer.jpg";

// const Footer = () => {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   return (
//     <div className="bg-white h-[400px] pt-20 py-10">
//       <div className="flex justify-between items-start px-20">
//         <div className="h-[250px]" data-aos="fade-right">
//           <img src={back} alt="Krisaanjh Logo" className="h-40 px-20" />
//           <h1 className="text-7xl font-bold text-[#356C38]">Krisaanjh</h1>
//         </div>

//         <div data-aos="fade-up">
//           <h2 className="text-2xl font-semibold text-[#2A4033] mb-2">
//             Navigation
//           </h2>
//           <ul className="pt-[20px] font-semibold text-2xl text-[#2A4033]">
//             <li className="mb-2">Privacy Policy</li>
//             <li className="mb-2">About Us</li>
//             <li className="mb-2">Copyright Policy</li>
//             <li>Terms and Conditions</li>
//           </ul>
//         </div>

//         <div className="bg-white" data-aos="fade-left">
//           <h2 className="text-2xl font-semibold text-[#2A4033] mb-2">
//             Contact Us
//           </h2>
//           <ul className="list-none pt-[20px] text-[#2A4033]">
//             <li className="flex font-semibold items-center text-2xl mb-2">
//               <IoLocationSharp className="text-[#356C38] mr-2" />
//               Ajay Kumar Garg Engineering College,
//               <br /> Ghaziabad, Uttar Pradesh
//             </li>
//             <li className="flex text-2xl font-semibold items-center mb-2">
//               <FaPhone className="text-[#356C38] mr-2" />
//               0123456789
//             </li>
//             <li className="text-2xl font-semibold">
//               For technical support related to Krisaanjh
//             </li>
//           </ul>
//         </div>
//       </div>
//       <img
//         src={foot}
//         alt="Footer Image"
//         className="w-full"
//         data-aos="fade-up"
//       />
//     </div>
//   );
// };

// export default Footer;













import React, { useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Footer.css";
import back from "../../assets/Asset 1@4x 1.png";
import foot from "../../assets/WhatsApp Image 2024-08-29 at 13.57.16_251b7f48 footer.jpg";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-white pt-10 pb-4">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-20 gap-10">
        {/* Logo + Title */}
        <div className="flex flex-col items-start md:items-center" data-aos="fade-right">
          <img src={back} alt="Krisaanjh Logo" className="h-20 md:h-32" />
          <h1 className="text-4xl md:text-6xl font-bold text-[#356C38] mt-2 md:mt-4">
            Krisaanjh
          </h1>
        </div>

        {/* Navigation */}
        <div data-aos="fade-up">
          <h2 className="text-xl md:text-2xl font-semibold text-[#2A4033] mb-2">
            Navigation
          </h2>
          <ul className="pt-2 md:pt-4 font-semibold text-lg md:text-xl text-[#2A4033]">
            <li className="mb-2 hover:underline cursor-pointer">Privacy Policy</li>
            <li className="mb-2 hover:underline cursor-pointer">About Us</li>
            <li className="mb-2 hover:underline cursor-pointer">Copyright Policy</li>
            <li className="hover:underline cursor-pointer">Terms and Conditions</li>
          </ul>
        </div>

        {/* Contact */}
        <div data-aos="fade-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#2A4033] mb-2">
            Contact Us
          </h2>
          <ul className="list-none pt-2 md:pt-4 text-[#2A4033]">
            <li className="flex items-start text-lg md:text-xl font-semibold mb-2">
              <IoLocationSharp className="text-[#356C38] mr-2 mt-1" />
              <span>
                Ajay Kumar Garg Engineering College,
                <br /> Ghaziabad, Uttar Pradesh
              </span>
            </li>
            <li className="flex items-center text-lg md:text-xl font-semibold mb-2">
              <FaPhone className="text-[#356C38] mr-2" />
              0123456789
            </li>
            <li className="text-lg md:text-xl font-semibold">
              For technical support related to Krisaanjh
            </li>
          </ul>
        </div>
      </div>

      
      <div className="mt-10" data-aos="fade-up">
        <img src={foot} alt="Footer Decoration" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
   
};

export default Footer;

