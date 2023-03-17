import React, { useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import HeroOne from "./HeroOne";
import HeroTwo from "./HeroTwo";
import Navbar from "./Navbar";
import "./OnBoard.css";
const OnBoard = () => {
  const [add, setAdd] = useState("");
  const clcikHandler = async () => {
    setAdd(window.ethereum.selectedAddress);
    console.log(window.ethereum);
  };

  return (
    <div className="onBoard">
      <Navbar></Navbar>
      <Hero></Hero>
      <HeroOne></HeroOne>
      <HeroTwo></HeroTwo>
      <Footer></Footer>
    </div>
  );
};

export default OnBoard;
