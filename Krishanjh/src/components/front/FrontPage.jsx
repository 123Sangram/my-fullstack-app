import React from 'react';
import FirstPage from '../firstpage/FirstPage';
import Footer from '../footer/Footer';
import Slider from '../ImageSlider/Slider';
import MidPage from '../midpage/MidPage';
import Navbar from '../navbar/Navbar';
import SecondPage from '../secondpage/SecondPage';

const FrontPage = () => {
    return (
        <div className="min-h-screen">
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


