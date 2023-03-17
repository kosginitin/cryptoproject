import React, { useContext, useEffect, useState } from "react";
import { webFunctionTwo } from "../../ContractUtil";
import { HomeContext } from "../Home";
import TextF from "../HomeComponents/TextF";
import TextFO from "../HomeComponents/TextFO";
import { dateTime } from "../University/UCertificates";
import "./CProfile.css";
const CProfile = () => {
  const [company, setCompany] = useState({});
  const { profileRefresh } = useContext(HomeContext);
  const [refresh, setRefresh] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobId, setJobId] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  //   useeffect

  useEffect(() => {
    companyHandler();
  }, [profileRefresh, refresh]);

  // upload handler
  const uploadHandler = async () => {
    if (
      jobTitle === "" ||
      jobId === "" ||
      salary === "" ||
      jobType === "" ||
      jobLocation === ""
    ) {
      alert("Please Fill all the fields");
      return;
    }
    const { contractCo, accountsCo } = await webFunctionTwo();
    try {
      const result = await contractCo.methods
        .addJob(jobTitle, salary, jobLocation, jobType, jobId)
        .send({
          from: accountsCo[0],
        });
      setJobId("");
      setJobLocation("");
      setJobTitle("");
      setSalary("");
      setJobType("");
      setRefresh(!refresh);
      console.log("result in cprofile upload handler ", result);
    } catch (e) {
      console.log("error in adding job ", e);
    }
  };

  //   getOrganisationDetails;

  const companyHandler = async () => {
    console.log("get company details");
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods.getCompanyDetails().call({
      from: accountsCo[0],
    });
    console.log("result is ", result);
    setCompany(result);
    console.log("organisation is ", company);
  };
  return (
    <div className="uProfile">
      <div>
        <TextF name="Company NAME" data={company[0]}></TextF>
        <TextF name="Company ADDRESS" data={company[1]}></TextF>
        <TextFO name="No of Jobs" data={company[2]}></TextFO>
        <TextFO name="Date of Join" data={dateTime(company[3])}></TextFO>
      </div>
      <div className="companyJobPost">
        <p>POST A JOB</p>
        <TextF
          name={"Job Title"}
          data={jobTitle}
          setValue={setJobTitle}
          con={false}
        ></TextF>
        <TextF
          name={"Job ID"}
          data={jobId}
          setValue={setJobId}
          con={false}
        ></TextF>
        <TextF
          name={"Salary"}
          data={salary}
          setValue={setSalary}
          con={false}
        ></TextF>
        <TextF
          name={"Job Location"}
          data={jobLocation}
          setValue={setJobLocation}
          con={false}
        ></TextF>
        <TextF
          name={"Job Type"}
          data={jobType}
          setValue={setJobType}
          con={false}
        ></TextF>
        <button className="customButton" onClick={uploadHandler}>
          Post JOb
        </button>
      </div>
    </div>
  );
};

export default CProfile;
