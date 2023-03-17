import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Web3 from "web3";
import OverAll from "../../contracts/OverAll.json";

import LeftArrow from "../../Images/LeftArrow.js";
import Cancel from "../../Images/Cancel";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { webFunction, webFunctionTwo } from "../ContractUtil";
import TextF from "../Home/HomeComponents/TextF";
import DropDown from "../Home/DropDown";
const AuthTwo = ({ setCurrent }) => {
  const { address, setAddress, registerName } = useContext(AppContext);
  const [organisationName, setOrganisationName] = useState("");
  const [errors, setErrors] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentUniqueID, setStudentUniqueID] = useState("");
  const [organisationNames, setOrganisationNames] = useState([]);
  const [haveText, setHaveText] = React.useState("");
  const [companyName, setCompanyName] = useState("");
  const [present, setPresent] = useState(false);

  const navigate = useNavigate();
  useLayoutEffect(() => {
    setAddress(window.ethereum.selectedAddress);
    // checking presnt later
    getOrganisations();
    checkAddressPresent();
  }, []);

  const prevPageHandler = () => {
    setCurrent(0);
  };

  const getAddress = (data) => {
    for (var i = 0; i < organisationNames.length; i++) {
      if (organisationNames[i][0] === data) {
        console.log("data in get address ", organisationNames[i][1]);
        return organisationNames[i][1];
      }
    }
  };

  // get ALL ORGANISATIONS

  const getOrganisations = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.getAllOrganisations().call({
      from: accounts[0],
    });
    console.log("getting all organisations");
    setOrganisationNames(result);
    console.log("organisations", result);
  };

  // check if organisation present

  const checkAddressPresent = async () => {
    console.log("checkAddressPresent register name is ", registerName);

    const { contract, accounts } = await webFunction();
    if (registerName === "University") {
      console.log("type of address is ", typeof accounts[0]);
      const result = await contract.methods.checkOrganisation().call({
        from: accounts[0],
      });
      console.log("result", result);
      if (result !== "no" && result.length > 6) {
        setPresent(true);
        setOrganisationName(result);
        return;
      }
    }
    if (registerName === "Student") {
      const result = await contract.methods.checkStudent().call({
        from: accounts[0],
      });
      console.log("result in checking student onw", result);
      if (result === "yes") {
        setPresent(true);
        const resultOne = await contract.methods
          .getStudentDetail(accounts[0])
          .call({
            from: accounts[0],
          });
        console.log(
          "resultOne in student checking two  ",
          resultOne[0],
          " two ",
          resultOne[1],
          " three ",
          resultOne[2]
        );
        setStudentName(resultOne[0]);
        setStudentUniqueID(resultOne[1]);
        setHaveText(resultOne[2]);

        return;
      }
    }

    if (registerName === "Company") {
      console.log("in equals to company checking  ");

      console.log("company is possible ");
      const { contractCo, accountsCo } = await webFunctionTwo();
      console.log("accountsCo", accountsCo[0]);
      const result = await contractCo.methods.checkCompany().call({
        from: accountsCo[0],
      });
      console.log("result in checking company onw ", result);
      if (result !== "no" && result.length > 6) {
        setPresent(true);
        setCompanyName(result);
        return;
      }
    }

    // for egistering the University
  };
  const registerHandler = async () => {
    console.log("registerHandler");

    const { contract, accounts } = await webFunction();

    if (registerName === "University") {
      if (organisationName.length < 6) {
        setErrors("Name must be at least 6 characters");
        return;
      }
      console.log("registerName  ", registerName);
      console.log("getaddress ", getAddress(haveText));
      const result = await contract.methods
        .addOrganisation(organisationName)
        .send({ from: accounts[0] });
      console.log("result after sending ", result);
      navigate("/home");
      return;
    }
    if (registerName === "Student") {
      console.log("registername  ", registerName);
      console.log("getaddress ", getAddress(haveText));
      const result = await contract.methods
        .addStudent(studentName, studentUniqueID, getAddress(haveText))
        .send({ from: accounts[0] });
      console.log("result after sending from addstudent ", result);
      navigate("/home");
      return;
    }

    if (registerName === "Company") {
      console.log("registername  ", registerName);
      console.log("companyname is ", companyName);
      if (companyName !== "" && companyName.length > 6) {
        const { contractCo, accountsCo } = await webFunctionTwo();
        console.log("registername  in register  ", registerName);
        // console.log("getaddress ", getAddress(haveText));
        const result = await contractCo.methods
          .addCompany(companyName)
          .send({ from: accountsCo[0] });
        console.log("result after sending from addcopany  result is  ", result);
        console.log("reister is completed");
        navigate("/home");
        return;
      }
    }
  };

  // login handler
  const loginHandler = () => {
    navigate("/home");
  };

  return (
    <div className="authTwo">
      <div onClick={prevPageHandler}>
        <LeftArrow></LeftArrow>
      </div>
      <div className="authTwoMain">
        {registerName === "University" ? (
          <TextF
            name={"University Name"}
            psi={"12px"}
            isi={"16px"}
            data={organisationName}
            setValue={setOrganisationName}
            con={present}
          ></TextF>
        ) : registerName === "Student" ? (
          <>
            <TextF
              name={"Unique id"}
              psi={"12px"}
              data={studentUniqueID}
              isi={"16px"}
              setValue={setStudentUniqueID}
              con={present}
            ></TextF>
            <TextF
              name={"Student Name"}
              psi={"12px"}
              data={studentName}
              isi={"16px"}
              setValue={setStudentName}
              con={present}
            ></TextF>
            <DropDown
              items={organisationNames}
              setHaveText={setHaveText}
              haveText={haveText}
              con={present}
            ></DropDown>
          </>
        ) : (
          <TextF
            name={"Company Name"}
            psi={"12px"}
            isi={"16px"}
            data={companyName}
            setValue={setCompanyName}
            con={present}
          ></TextF>
        )}
        <p style={{ fontWeight: "600" }}>Account Address</p>
        <p className="address">{address}</p>
        {errors && (
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Cancel></Cancel>
            <p style={{ color: "red", marginLeft: "20px" }}>{errors}</p>
          </div>
        )}
        {present ? (
          <button className="authButton" onClick={loginHandler}>
            Login
          </button>
        ) : (
          <button className="authButton" onClick={registerHandler}>
            Register
          </button>
        )}
      </div>
    </div>
  );
};

// registerName.length != 0 ? (
//         <button className="authButton" onClick={loginHandler}>
//           {" "}
//           Login
//         </button>
//       ) :

export default AuthTwo;
