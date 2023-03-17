import React from "react";
import "./HeroTwoDiv.css";
const HeroTwoDiv = ({ clickHandler, image, color, name, id }) => {
  return (
    <div
      className="heroTwoDiv"
      id="scrollPos"
      style={{ backgroundColor: color }}
    >
      <div>
        <h1>{name}</h1>
        <button className="customButtonTwo" onClick={() => clickHandler(id)}>
          Connect
        </button>
      </div>
      <div>
        <img src={image}></img>
      </div>
    </div>
  );
};

export default HeroTwoDiv;
