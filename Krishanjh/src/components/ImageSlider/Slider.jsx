import React from 'react'
import ImageSlider from './ImageSlider';
 // by using import method src group 12(2)
import imagge1 from "../../assets/images/Spright-Agro-banner-2-scaled.jpeg";
import imagge2 from "../../assets/images/Spright-Agro-banner-3-scaled.jpeg";
import imagge3 from "../../assets/images/Spright-Agro-Banner-1-scaled.jpeg";
import imagge4 from "../../assets/images/Group 12 (2).png";
import imagge15 from "../../assets/images/Group 12 (2).png";
import imagge5 from "../../assets/images/Spright-Agro-banner-2-scaled.jpeg";
import imagge6 from "../../assets/images/Spright-Agro-Banner-1-scaled.jpeg";
import imagge7 from "../../assets/images/Spright-Agro-banner-2-scaled.jpeg";
import imagge8 from "../../assets/images/Group 12 (2).png";
import imagge9 from "../../assets/images/Spright-Agro-banner-3-scaled.jpeg";
const images = [
  imagge1,
  imagge2,
  imagge3,
  imagge4,
  imagge5,
  imagge6,
  imagge7,
  imagge8,
  imagge9,
  imagge15,
];


const content = [
  "Your harvest, our promise,Krisaanjh",
  "Your harvest, our promise,Krisaanjh",
  "Your harvest, our promise,Krisaanjh",
  "Your harvest, our promise,Krisaanjh",
  "Your harvest, our promise,Krisaanjh",
  "Your harvest, our promise,Krisaanjh",
  "Your harvest, our promise,Krisaanjh",
  "Your harvest, our promise,Krisaanjh",
  "Your harvest, our promise,Krisaanjh",
];


const Slider=()=>{
    return (
      <>
        <div className=''>
                 <ImageSlider   images={images} content={content} delay={10000} />
        </div>
      </>
    );
}
export default Slider;