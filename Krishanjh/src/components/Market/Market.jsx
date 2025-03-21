import React, { useState } from "react";

const Market = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <div className="bg-[#215A37] text-white">
        <div className="flex justify-between items-center px-6 py-4 text-3xl">
          <div className="flex items-center gap-3">
            <img
              src="src/assets/Asset 1@4x 1.png"
              alt="Krishanjh Logo"
              className="w-[50px] h-[50px] animate-bounce"
            />
            <h1 className="text-3xl font-bold animate-pulse tracking-widest leading-tight">
              Krisaanjh
            </h1>
          </div>
          <ul className="flex text-2xl items-center gap-10">
            <li>Home</li>
            <li>Education</li>
            <li>Support</li>
            <li>FAQ</li>
            <li onClick={handleProfileClick} className="cursor-pointer">
              <img
                src="src/assets/WhatsApp_Image_2024-08-24_at_10.04.47_52f57d61_porfolio-removebg-preview (1).png"
                alt="Profile"
                className="w-[40px] h-[40px] rounded-full"
              />
            </li>
          </ul>
        </div>

        {/* Profile Modal */}
        {isProfileOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <img
                src="src/assets/WhatsApp_Image_2024-08-24_at_10.04.47_52f57d61_porfolio-removebg-preview (1).png"
                alt="Profile Large"
                className="w-[200px] h-[200px] rounded-full mx-auto"
              />
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Sangram Singh
              </h2>
              <button
                onClick={handleProfileClick}
                className="mt-6 px-4 py-2 bg-[#215A37] text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Market;
