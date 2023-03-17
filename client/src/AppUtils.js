import React, { useState, useEffect } from "react";
import Web3 from "web3";
import sendeth from "./contracts/SendEth.json";
// import Migrations from "./contracts/Migrations.json";
import count from "./contracts/Count.json";
import { CONTRACT_ADDRESS } from "./utils";
const AppUtils = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  useEffect(() => {}, []);

  const walletCheck = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    console.log("all accounts ", accounts);
    setAccount(accounts[0]);
    const balance = await web3.eth.getBalance(accounts[0]);
    setBalance(balance);
  };

  const getName = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const bN = await web3.eth.getBlockNumber();
    console.log("bN", bN);
    const id = await web3.eth.net.getId();
    console.log("id", id);
    const deployed = count.networks["5777"];
    const contract = new web3.eth.Contract(count.abi, deployed.address);
    const name = await contract.methods.get().call();
    console.log("name", name);
  };
  const sendEthName = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const bN = await web3.eth.getBlockNumber();
    console.log("bN", bN);
    const id = await web3.eth.net.getId();
    console.log("id", id);
    const deployed = sendeth.networks["5777"];
    console.log("conteact address ", deployed.address);
    const contract = new web3.eth.Contract(sendeth.abi, deployed.address);
    console.log("methodss are ", contract.methods);
    const name = await contract.methods.name().call();
    console.log("name in sendEth", name);
  };
  const senEth = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const bN = await web3.eth.getBlockNumber();
    console.log("bN", bN);
    const id = await web3.eth.net.getId();
    console.log("id", id);
    const deployed = sendeth.networks["5777"];
    console.log("conteact address ", deployed.address);
    const contract = new web3.eth.Contract(sendeth.abi, deployed.address);
    console.log("methodss are ", contract.methods);
    const dataSend = await contract.methods
      .sendEth()
      .send({ from: account, value: 1000000000000000000 });
  };
  return (
    <div>
      <button onClick={walletCheck}>Check Wallet</button>
      {/* {account && ( */}
      {account && <div>{account}</div>}
      {/* ) */}
      <button onClick={getName}>Get Name</button>
      <button onClick={sendEthName}>Get name </button>
      <button onClick={senEth}></button>
    </div>
  );
};

export default AppUtils;
