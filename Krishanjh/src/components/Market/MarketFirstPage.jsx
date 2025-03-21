


import React from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import ListIcon from "@mui/icons-material/List";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import new1 from '../../assets/Screenshot 2024-08-25 144730 1 (1).png'
import new11 from '../../assets/Screenshot 2024-08-25 144730 2.png'
import new2 from "../../assets/Group 1000000923.png";
import new3 from "../../assets/Screenshot 2024-08-25 144730 2.png";
import new4 from '../../assets/Group 1000000912.png'
import new5 from "../../assets/Group 1000000913.png";
import logo from '../../assets/Asset 1@4x 1.png'
import my from '../../assets/WhatsApp_Image_2024-08-24_at_10.04.47_52f57d61_porfolio-removebg-preview (1).png'
const MarketFirstPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#215A37] text-white fixed top-0 right-0 left-0 flex justify-between items-center p-4">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Krishanjh Logo"
            className="w-[50px] h-[50px] animate-bounce"
          />
          <h1 className="text-3xl font-bold ml-3">Krisaanjh</h1>
        </div>
        <nav>
          <ul className="flex space-x-20 text-[23px]">
            <li>Home</li>
            <li>Education</li>
            <li>Support</li>
            <li>FAQ</li>
            <li className="cursor-pointer">
              <img
                src={my}
                alt="Profile"
                className="w-[40px] h-[40px] rounded-full"
              />
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[350px] h-full bg-white fixed left-0 top-20 border-2 shadow-lg p-4">
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span className="font-bold text-[#243F32] text-[27px]">
                Krisaanjh Mandi
              </span>
              <span className="border px-2 bg-gray-300 rounded-sm">
                {/* <img
                  src="src/assets/Back-Navs.png"
                  alt=""
                  className="h-4 mt-1 my-2"
                /> */}
              </span>
            </li>

            {/* Search Bar */}
            <li className="flex items-center border rounded-full">
              <SearchIcon className="text-gray-600 mx-3 hover:text-green-700" />
              <input
                type="text"
                placeholder="Search"
                className="p-2 outline-none"
              />
            </li>

            {/* Navigation Items with Hover Effect */}
            <li className="group flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <div className="border px-2 py-2 rounded-full bg-gray-200 group-hover:bg-green-700">
           <TravelExploreIcon/>
              </div>
              <span className="text-[20px] font-semibold">Browse all</span>
            </li>
            <li className="group flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <div className="border px-2 py-2 rounded-full bg-gray-200 group-hover:bg-green-700">
              <CircleNotificationsIcon/>
              </div>
              <span className="text-[20px] font-semibold">Notification</span>
            </li>
            <li className="group flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <div className="border px-2 py-2 rounded-full bg-gray-200 group-hover:bg-green-700">
               <ListIcon />
              </div>
              <span className="text-[20px] font-semibold">Inbox</span>
            </li>
            <li className="group flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <div className="border px-2 py-2 rounded-full bg-gray-200 group-hover:bg-green-700">
              <AutoAwesomeMotionIcon />
              </div>
              <span className="text-[20px] font-semibold">Filter</span>
            </li>
            <li className="group flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <div className="border px-2 py-2 rounded-full bg-gray-200 group-hover:bg-green-700">
                <SettingsIcon />
              </div>
              <span className="text-[20px] font-semibold">Settings</span>
            </li>
            <hr className="border-2 " />
            <li className="group flex items-center space-x-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <div className="border px-2 py-2 rounded-full bg-gray-200 group-hover:bg-green-700">
                <LocationOnIcon/>
              </div>
              <span className="text-[20px] font-semibold">Location</span>
            </li>
            <h1 className="text-blue-500 text-[20px] font-semibold">
              Ghaziabad, india, 201009
            </h1>
            <hr className="border-2 " />
          </ul>
        </aside>

        {/* Featured Listings */}
        <main className="flex-1 bg-[#F4F2EB] pt-10 absolute right-0 left-90 top-20 p-6 px-[140px]">
          <div className="flex justify-between mr-10 ">
            <h2 className="text-4xl text-[#243F32] font-semibold mb-4">
              Featured Listing
            </h2>
            <div className="">
              <button className="text-black border px-4 py-1 text-1xl border-gray-300 rounded ">
                <span className="text-gray-400">Sort:</span>Category
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 w-[900px] lg:grid-cols-3 gap-20">
            {/* Repeat similar blocks for listings */}
            {/* Example Listing */}
            <div className="mt-10">
              <div className="relative">
                <img
                  src={new1}
                  alt="Nestle"
                  className="w-full"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mt-4">
                <a href="https://www.kisandeals.com/egg-rate">
                  <button className="mt-2 bg-[#42885A] text-[25px] text-white hover:bg-green-900 font-semibold w-full py-3 rounded-lg">
                    View Details &rarr;
                  </button>
                </a>
                <h3 className="text-[23px] font-semibold">Russet Potato</h3>
                <p className="text-lg font-bold">500 KG</p>
                <p className="text-sm text-gray-600">
                  Nestle House DFL phase II, Gurgaon, India.
                </p>
              </div>
            </div>
            {/* Add more listing blocks as needed */}
            <div className="mt-10">
              <div className="relative">
                <img
                  src={new2}
                  alt="Nestle"
                  className="w-full"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mt-4">
                <a href="https://www.kisandeals.com/egg-rate">
                  <button className="mt-2 bg-[#42885A] text-[25px] text-white hover:bg-green-900 font-semibold w-full py-3 rounded-lg">
                    View Details &rarr;
                  </button>
                </a>

                <h3 className="text-[23px] font-semibold">Russet Potato</h3>
                <p className="text-lg font-bold">500 KG</p>
                <p className="text-sm text-gray-600">
                  Nestle House DFL phase II, Gurgaon, India.
                </p>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="mt-10">
              <div className="relative">
                <img
                  src={new3}
                  alt="Nestle"
                  className="w-full"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mt-4">
                <a href="https://www.kisandeals.com/egg-rate">
                  <button className="mt-2 bg-[#42885A] text-[25px] text-white hover:bg-green-900 font-semibold w-full py-3 rounded-lg">
                    View Details &rarr;
                  </button>
                </a>

                <h3 className="text-[23px] font-semibold">Russet Potato</h3>
                <p className="text-lg font-bold">500 KG</p>
                <p className="text-sm text-gray-600">
                  Nestle House DFL phase II, Gurgaon, India.
                </p>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="">
              <div className="relative">
                <img
                  src={new11}
                  alt="Nestle"
                  className="w-full"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mt-4">
                <a href="https://www.kisandeals.com/egg-rate">
                  <button className="mt-2 bg-[#42885A] text-[25px] text-white hover:bg-green-900 font-semibold w-full py-3 rounded-lg">
                    View Details &rarr;
                  </button>
                </a>
                <h3 className="text-[23px] font-semibold">Russet Potato</h3>
                <p className="text-lg font-bold">500 KG</p>
                <p className="text-sm text-gray-600">
                  Nestle House DFL phase II, Gurgaon, India.
                </p>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="">
              <div className="relative">
                <img
                  src={new4}
                  alt="Nestle"
                  className="w-full"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mt-4">
                <a href="https://www.kisandeals.com/egg-rate">
                  <button className="mt-2 bg-[#42885A] text-[25px] text-white hover:bg-green-900 font-semibold w-full py-3 rounded-lg">
                    View Details &rarr;
                  </button>
                </a>

                <h3 className="text-[23px] font-semibold">Russet Potato</h3>
                <p className="text-lg font-bold">500 KG</p>
                <p className="text-sm text-gray-600">
                  Nestle House DFL phase II, Gurgaon, India.
                </p>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="">
              <div className="relative">
                <img
                  src={new5}
                  alt="Nestle"
                  className="w-full"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mt-4">
                <a href="https://www.kisandeals.com/egg-rate">
                  <button className="mt-2 bg-[#42885A] text-[25px] text-white hover:bg-green-900 font-semibold w-full py-3 rounded-lg">
                    View Details &rarr;
                  </button>
                </a>
                <h3 className="text-[23px] font-semibold">Russet Potato</h3>
                <p className="text-lg font-bold">500 KG</p>
                <p className="text-sm text-gray-600">
                  Nestle House DFL phase II, Gurgaon, India.
                </p>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="">
              <div className="relative">
                <img
                  src="src/assets/nestle-logo.png"
                  alt="Nestle"
                  className="w-full"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mt-4">
                <a href="https://www.kisandeals.com/egg-rate">
                  <button className="mt-2 bg-[#42885A] text-[25px] text-white hover:bg-green-900 font-semibold w-full py-3 rounded-lg">
                    View Details &rarr;
                  </button>
                </a>
                <h3 className="text-[23px] font-semibold">Russet Potato</h3>
                <p className="text-lg font-bold">500 KG</p>
                <p className="text-sm text-gray-600">
                  Nestle House DFL phase II, Gurgaon, India.
                </p>
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div className="">
              <div className="relative">
                <img
                  src="src/assets/nestle-logo.png"
                  alt="Nestle"
                  className="w-full"
                />
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mt-4">
                <button className="mt-2 bg-[#42885A] text-[25px] text-white font-semibold w-full py-3 rounded-lg">
                  View Details &rarr;
                </button>
                <h3 className="text-[23px] font-semibold">Russet Potato</h3>
                <p className="text-lg font-bold">500 KG</p>
                <p className="text-sm text-gray-600">
                  Nestle House DFL phase II, Gurgaon, India.
                </p>
              </div>
            </div>
            {/* Repeat similar blocks for other listings */}
            {/* ... */}
          </div>
        </main>
      </div>
      <Link to="/chatbot">
        <div className="fixed bottom-8 right-8 bg-[#215A37] p-3 rounded-full shadow-lg cursor-pointer">
          <ChatIcon className="text-white text-4xl" />
        </div>
      </Link>
    </div>
  );
};

export default MarketFirstPage;

