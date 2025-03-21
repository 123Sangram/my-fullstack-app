import React from "react";
import Navbar from "../navbar/Navbar";
import Slider from "../ImageSlider/Slider";
import MidPage from "../midpage/MidPage";
import SecondPage from "../secondpage/SecondPage";
import FirstPage from "../firstpage/FirstPage";
import Footer from "../footer/Footer";

const FrontPage = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <MidPage />
      <SecondPage />
      <FirstPage />
      <Footer />
    </div>
  );
};

export default FrontPage;
