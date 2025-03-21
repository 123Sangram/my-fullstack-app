
import React, { useState } from "react";
import { FaPhoneAlt, FaGlobe } from "react-icons/fa"; // Importing icons from react-icons
import {Link} from 'react-router-dom'
import Button from "@mui/material/Button";

import logo from '../../assets/Asset 1@4x 1.png'
const Header = () => {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-around items-center font-semibold py-8 gap-[500px] bg-[#E5FFEF] text-[#215A37] z-50">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Krishanjh Logo"
            className="w-[50px] h-[50px] animate-bounce"
          />
          <h1 className="text-3xl font-bold animate-pulse tracking-widest leading-tight">
            Krisaanjh
          </h1>
        </div>

        {/* Navigation */}
        <div className="header flex leading-tight text-[20px]">
          <ul className="flex justify-between items-center gap-8">
            <li className="flex items-center gap-2 cursor-pointer">
              <FaPhoneAlt /> {/* Phone icon */}
              <span>Call us |</span>
            </li>
            <li
              className="relative flex items-center gap-2 cursor-pointer"
              onClick={() => setShowLanguageOptions(!showLanguageOptions)}
            >
              <FaGlobe /> {/* Globe icon */}
              <span>English |</span>
              {showLanguageOptions && (
                <ul className="absolute top-8 right-0 bg-white text-black p-2 shadow-lg rounded">
                  <li className="py-1 px-3 hover:bg-gray-200 cursor-pointer">
                    Hindi
                  </li>
                </ul>
              )}
            </li>

          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
