import React, { useEffect, useState } from "react";
import { webFunction } from "../../ContractUtil";
import TextF from "../HomeComponents/TextF";
import TextFO from "../HomeComponents/TextFO";
import "./SProfile.css";

const inputHeadings = [
  "STUDENT NAME",
  "STUDENT ID",
  "ORGANISATION NAME",
  "ACC ADDRESS",
  "NO OF CERTIFICATES",
];
const SProfile = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.getStudentDetail(accounts[0]).call({
      from: accounts[0],
    });
    console.log("result is in sprofile ", result);
    setUserData(result);
  };
  return (
    <div className="sProfileParent">
      <div className="sProfile">
        <div>
          <TextF
            name={inputHeadings[0]}
            psi={"12px"}
            data={userData[0]}
            isi={"16px"}
            con={true}
          ></TextF>
          <TextF
            name={inputHeadings[1]}
            psi={"12px"}
            data={userData[1]}
            isi={"16px"}
            con={true}
          ></TextF>
          <TextF
            name={inputHeadings[2]}
            psi={"12px"}
            data={userData[2]}
            isi={"16px"}
            con={true}
          ></TextF>
          <TextF
            name={inputHeadings[3]}
            psi={"12px"}
            data={userData[3]}
            isi={"16px"}
            con={true}
          ></TextF>
          <TextFO name={inputHeadings[4]} data={userData[4]}></TextFO>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SProfile;
