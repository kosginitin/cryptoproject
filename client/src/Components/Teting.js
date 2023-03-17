import React, { useEffect } from "react";
import Web3 from "web3";
import OverAll from "../contracts/OverAll.json";
const Teting = () => {
  const [address, setAddress] = React.useState("address");

  useEffect(() => {}, []);

  const addOrg = async () => {
    console.log("addOrg");
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const networkData = await OverAll.networks[networkId];
    if (networkData) {
      const abi = OverAll.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      const result = await contract.methods
        .addOraganisation("test one")
        .send({ from: accounts[0] });
      console.log("result", result);
    }
  };
  const addAddress = async () => {
    console.log("addAddress");
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setAddress(accounts[0]);
  };
  const getNames = async () => {
    console.log("getNames");
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const networkData = OverAll.networks[networkId];
    if (networkData) {
      const abi = OverAll.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      const result = await contract.methods
        .getAllOrganisations()
        .call({ from: accounts[0] });
      console.log("result", result);
    }
  };
  const checkAddress = async () => {
    console.log("checkAddress");
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const networkData = OverAll.networks[networkId];
    if (networkData) {
      const abi = OverAll.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      const result = await contract.methods.checkAddress().call({
        from: accounts[0],
      });
      console.log("result", result);
    }
  };

  const getOrgName = async () => {
    console.log("getOrgName");
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const networkData = OverAll.networks[networkId];
    if (networkData) {
      const abi = OverAll.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      const result = await contract.methods
        .checkAddressTwo()
        .call({ from: accounts[0] });
      console.log("result", result);
    }
  };

  return (
    <div>
      <h1>Teting</h1>
      <h2>{address}</h2>
      <button onClick={addAddress}>addAddress</button>
      <button onClick={addOrg}>Add Organisation</button>

      <button onClick={getNames}>get Names </button>
      <button onClick={checkAddress}>check address</button>
      <button onClick={getOrgName}>get check organisationName</button>
      <button>get Name</button>
    </div>
  );
};

export default Teting;
