import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { AppContext } from "../../App";
import "./Auth.css";
import OverAll from "../../contracts/OverAll.json";
import AuthOne from "./AuthOne";
import AuthTwo from "./AuthTwo";
import { checkAddressPresent } from "./AuthMethods";
import { webFunction } from "../ContractUtil";
const Auth = () => {
  const [allow, setAllow] = useState(false);
  const [fname, setFname] = useState("");
  const { registerName, setRegisterName } = useContext(AppContext);
  useEffect(() => {
    console.log("Auth");
    // checkAddressPresent();

    return () => {
      setAllow(false);
    };
  }, []);

  useEffect(() => {
    if (allow) {
    }
  }, [allow]);
  const checkAddressPresent = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.checkAddressOrganisation().call({
      from: accounts[0],
    });
    console.log("result", result);
    if (result) {
      setRegisterName("University");
      setAllow(true);
      return;
    } else {
      const result = await contract.methods.checkAddressStudent().call({
        from: accounts[0],
      });
      console.log("result", result);
      if (result) {
        setRegisterName("Student");
        setAllow(true);
        return;
      } else {
        const result = await contract.methods.checkAddressCompany().call({
          from: accounts[0],
        });
        console.log("result", result);
        if (result) {
          setRegisterName("Company");
          setAllow(true);
          return;
        } else {
          setRegisterName("");
          setAllow(false);
          return;
        }
      }
    }
  };

  const [current, setCurrent] = useState(0);
  const continueHandler = () => {
    setAllow(false);
  };
  return (
    <>
      {allow ? (
        <div>
          <h1>Please login to access the application {registerName}</h1>
          <button onClick={continueHandler}>Continue</button>
        </div>
      ) : (
        <div className="auth">
          {current === 0 ? (
            <AuthOne setCurrent={setCurrent} />
          ) : (
            <AuthTwo setCurrent={setCurrent} />
          )}
        </div>
      )}
    </>
  );
};

export default Auth;
