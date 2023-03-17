import React, { useState } from "react";
import "./NavBar.css";
const Navbar = () => {
  const [glass, setGlass] = useState(false);
  window.onscroll = (e) => {
    if (window.pageYOffset > 50) {
      setGlass(true);
    } else {
      setGlass(false);
    }
  };
  const connectHandler = () => {
    var divElement = document.getElementById("scrollPos");
    console.log("clicked ");
    console.log(divElement.offsetTop);
    window.scrollTo({ top: divElement.offsetTop - 100, behavior: "smooth" });
  };
  return (
    <div
      className="navBar"
      style={
        glass
          ? {
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10.05px)",
            }
          : {}
      }
    >
      <h1>EEC</h1>
      <button className="customButton" onClick={connectHandler}>
        connect
      </button>
    </div>
  );
};

export default Navbar;
