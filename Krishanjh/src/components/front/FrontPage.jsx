import React from 'react';
import Footer from '../footer/Footer';
import Slider from '../ImageSlider/Slider';
import MidPage from '../midpage/MidPage';
import Navbar from '../navbar/Navbar';
import SecondPage from '../secondpage/SecondPage';
import ThirdPage from '../firstPage/ThirdPage';

const FrontPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Slider />
            <MidPage />
            <SecondPage />
         <ThirdPage/>
            <Footer />
        </div>
    );
};

export default FrontPage;


