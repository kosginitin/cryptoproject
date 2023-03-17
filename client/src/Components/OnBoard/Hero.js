import React from "react";
import "./Hero.css";
import HeroImage from "../../Images/HeroImage";
import Search from "../../Images/Search";
import RightArrow from "../../Images/RightArrow";
const Hero = () => {
  return (
    <div className="heroOnBoard">
      <div>
        <h2>EthereumE-Certify</h2>
        <p>
          Secure your certifications using Blockchain.
        </p>
        

       
      </div>
      <div>
        <HeroImage></HeroImage>
      </div>
    </div>
  );
};

export default Hero;
