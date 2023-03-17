import React, { useEffect, useState } from "react";
import { webFunction } from "../ContractUtil";

const HomeTest = () => {
  const [organisations, setOrganisations] = useState([]);
  useEffect(() => {
    connectWallet();
  }, []);
  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    // setMetaMaskConnect(true);
  };

  const accesssChecker = async (cuniqueId, addr) => {
    console.log("accesssChecker");
    var cuniqueId = "234567890";
    var addr = "0xe87b1C54c6f11dfCb1A8685DfAFa88Ad2ad236F6";
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.checkAcess(cuniqueId, addr).call({
      from: accounts[0],
    });
    console.log("result in access checker", result);
    return result;
  };
  const requestAcess = async () => {
    console.log("request checker ");
    var cuniqueId = "234567890";
    var addr = "0xe87b1C54c6f11dfCb1A8685DfAFa88Ad2ad236F6";
    console.log("addr", addr);
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.giveAcess(addr, cuniqueId).send({
      from: accounts[0],
    });
    console.log("result in request  acesss ", result);
    // setRefresh(!refresh);
  };
  // setOrganisations(result);

  return (
    <div>
      <button onClick={accesssChecker}>add organisations</button>
      <button onClick={requestAcess}>get organisations</button>
      <p>{organisations}</p>
      {organisations.map((organisation) => (
        <p>{organisation[0]}</p>
      ))}
    </div>
  );
};

export default HomeTest;
