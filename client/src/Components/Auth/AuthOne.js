import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import MetaMask from "../../Images/metamask.png";
import Web3 from "web3";
const AuthOne = ({ setCurrent }) => {
  const {
    setMetaMaskInstall,
    metaMaskInstall,
    metaMaskConnect,
    setMetaMaskConnect,
  } = useContext(AppContext);

  useEffect(() => {
    checkMetaMask();
  }, []);

  const checkMetaMaskConnect = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      setMetaMaskConnect(true);
    } else {
      setMetaMaskConnect(false);
    }
  };

  const checkMetaMask = () => {
    if (window.ethereum) {
      console.log("MetaMask is installed");
      setMetaMaskInstall(true);
      checkMetaMaskConnect();
    } else {
      setMetaMaskInstall(false);
      console.log("Please install MetaMask");
    }
  };

  const nextHandler = () => {
    setCurrent(1);
  };

  const connectWallet = async () => {
    console.log("connectWallet");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    setMetaMaskConnect(true);
    console.log("MetaMask is connected");
  };

  return (
    <div className="authBasic authOneBasic">
      <h1>Connect Meta Mask</h1>
      <img src={MetaMask}></img>
      {metaMaskInstall ? (
        <>
          <p>MetaMask Available </p>
          {metaMaskInstall && !metaMaskConnect ? (
            <button className="authButton" onClick={connectWallet}>
              Connect To MetaMask{" "}
            </button>
          ) : (
            <button className="authButton" onClick={nextHandler}>
              Next{" "}
            </button>
          )}
        </>
      ) : (
        <p>Please install MetaMask</p>
      )}
    </div>
  );
};

export default AuthOne;
