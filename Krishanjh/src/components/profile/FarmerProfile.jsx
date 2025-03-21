import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../navbar/Navbar";

const FarmerProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    // Get user data from localStorage if not available from context
    if (!user) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        // No user data found, redirect to login
        navigate('/farmer-form');
      }
    } else {
      setUserData(user);
    }
  }, [user, navigate]);

  const menuItems = [
    { title: "Chat with Buyers", path: "/chatbot", icon: "💬" },
    { title: "Market Analysis", path: "/MarketTrendAnalyzer", icon: "📊" },
    { title: "Contract Farming", path: "/contract", icon: "📝" },
    { title: "Legal Support", path: "/legal", icon: "⚖️" },
  ];

  if (!userData && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Loading...</h2>
          <p className="text-gray-600">Please wait while we load your profile.</p>
        </div>
      </div>
    );
  }

  const displayUser = userData || user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-900">
      <div className="fixed top-0 left-0 w-full z-50">
    
      </div>
      <div className="pt-28"> {/* Increased padding-top to account for the navbar */}
        {/* Header Section */}
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {displayUser?.image ? (
                  <img
                    src={displayUser.image}
                    alt={displayUser.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl">
                    {displayUser?.name?.charAt(0)}
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Welcome, {displayUser?.name}!
                  </h1>
                  <p className="text-gray-600">
                    {userType === "farmer"
                      ? `${displayUser?.landSize || "N/A"} acres | ${displayUser?.cropType || "Various Crops"}`
                      : displayUser?.companyName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600">
                  Click to access {item.title.toLowerCase()}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">No recent activities</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {userType === "farmer" ? "Crop Status" : "Recent Orders"}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">No data available</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Notifications
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">No new notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
