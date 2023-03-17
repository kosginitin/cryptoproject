import React, { useContext, useEffect, useState } from "react";
import "./HeroTwo.css";
import certificate from "../../Images/Certificate.png";
import HeroTwoDiv from "./HeroTwoDiv";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
const HeroTwo = () => {
  const navigate = useNavigate();
  const { setRegisterName, registerName } = useContext(AppContext);
  useEffect(() => {
    if (registerName.length > 0) {
      navigate("/auth");
    }
  }, [registerName]);

  const registerHandler = (id) => {
    console.log("registerHandler in onboard ", id);
    if (id === 0) {
      setRegisterName("Student");
      console.log("registerName is clicked student ");
    }
    if (id === 1) {
      setRegisterName("University");
    }
    if (id === 2) {
      setRegisterName("Company");
    }

    return;
  };

  return (
    <div className="heroTwo">
      <HeroTwoDiv
        clickHandler={registerHandler}
        image={certificate}
        id={0}
        color="#2E33B3"
        name="Continue as Student"
      ></HeroTwoDiv>
      <HeroTwoDiv
        clickHandler={registerHandler}
        image={certificate}
        id={1}
        color="#D8501C"
        name="Continue as University"
      ></HeroTwoDiv>
      <HeroTwoDiv
        clickHandler={registerHandler}
        image={certificate}
        id={2}
        color="#01C699"
        name="Continue as Company"
      ></HeroTwoDiv>
    </div>
  );
};

export default HeroTwo;
