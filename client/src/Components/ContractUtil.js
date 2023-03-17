import Web3 from "web3";
import OverAll from "../contracts/OverAll.json";
import OverAllTwo from "../contracts/OverAllTwo.json";
export const webFunction = async () => {
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const networkData = OverAll.networks[networkId];
  if (networkData) {
    const abi = OverAll.abi;
    const conAddress = networkData.address;
    const contract = new web3.eth.Contract(abi, conAddress);
    return { contract, accounts };
  }
};
export const webFunctionTwo = async () => {
  console.log("web function two ");
  const web3 = new Web3(window.ethereum);
  const accountsCo = await web3.eth.getAccounts();
  console.log(accountsCo);
  const networkId = await web3.eth.net.getId();
  const networkData = OverAllTwo.networks[networkId];
  if (networkData) {
    const abi = OverAllTwo.abi;
    const conAddress = networkData.address;
    const contractCo = new web3.eth.Contract(abi, conAddress);
    return { contractCo, accountsCo };
  }
};
