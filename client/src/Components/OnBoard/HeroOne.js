import React from "react";
import "./HeroOne.css";
import Certificate from "../../Images/Certificate.png";
const HeroOne = () => {
  return (
    <div className="heroOne">
      <div>
        <h1>EthereumE-Certify </h1>
        <p>Digital Certificate Validation using Blockchain </p>
        <button className="customButton">
          Place Your Certificate in Ethereum Blockchain
        </button>
      </div>
      <div>
        <img src={Certificate}></img>
      </div>
    </div>
  );
};

export default HeroOne;
