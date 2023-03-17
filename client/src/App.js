import React, { useEffect, createContext, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import OnBoard from "./Components/OnBoard/OnBoard";
// import Sample from "./contracts/Sample.json";
import Web3 from "web3";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Teting from "./Components/Teting";
import HomeTest from "./Components/Testing/HomeTest";

export const AppContext = createContext();

// app.js

const App = () => {
  // usestate

  const [metaMaskInstall, setMetaMaskInstall] = useState(false);
  const [metaMaskConnect, setMetaMaskConnect] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [address, setAddress] = useState("");
  // useeffect
  useEffect(() => {}, []);

  return (
    <AppContext.Provider
      value={{
        metaMaskConnect,
        setMetaMaskConnect,
        metaMaskInstall,
        setMetaMaskInstall,
        setRegisterName,
        address,
        setAddress,
        registerName,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<OnBoard />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
