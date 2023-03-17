import React, { useContext, useEffect, useState } from "react";
import { webFunction } from "../../ContractUtil";
import { HomeContext } from "../Home";
import TextF from "../HomeComponents/TextF";
import TextFO from "../HomeComponents/TextFO";
import Certificate from "./Certificate";
import Student from "./Student";
import "./UProfile.css";
const Uprofile = () => {
  const { profileRefresh } = useContext(HomeContext);
  const [current, setCurrent] = useState(0);
  const [organisation, setOrganisation] = useState({});

  //   useeffect

  useEffect(() => {
    organisationHandler();
  }, [profileRefresh]);

  //   getOrganisationDetails;

  const organisationHandler = async () => {
    console.log("getOrganisationDetails");
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.getOrganisationDetails().call({
      from: accounts[0],
    });
    console.log("result is ", result);
    setOrganisation(result);
    console.log("organisation is ", organisation);
  };
  return (
    <div className="uProfile">
      <div>
        <TextF name="UNIVERSITY NAME" data={organisation[0]}></TextF>
        <TextF name="UNIVERSITY ADDRESS" data={organisation[1]}></TextF>
        <TextFO name="ADDED STUDENT UNIQUEIDS" data={organisation[2]}></TextFO>
        <TextFO name="NO OF STUDENTS" data={organisation[3]}></TextFO>
        <TextFO name="NO OF CERTIFICATES" data={organisation[4]}></TextFO>
      </div>
      <div>
        <div className="uploadC">
          <div
            onClick={() => setCurrent(0)}
            style={
              current == 0
                ? {
                    color: "var(--secondColor--)",
                    borderBottom: "2px solid var(--secondColor--)",
                  }
                : {
                    color: "rgb(92, 104, 109)",
                  }
            }
          >
            Add Student
          </div>
          <div
            onClick={() => setCurrent(1)}
            style={
              current == 1
                ? {
                    color: "var(--secondColor--)",
                    borderBottom: "2px solid var(--secondColor--)",
                  }
                : {
                    color: "rgb(92, 104, 109)",
                  }
            }
          >
            Add Certificate
          </div>
        </div>

        {current == 0 ? <Student></Student> : <Certificate></Certificate>}
      </div>
    </div>
  );
};

export default Uprofile;
