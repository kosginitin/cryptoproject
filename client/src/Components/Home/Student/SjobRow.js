import React, { useEffect, useState } from "react";
import { webFunctionTwo } from "../../ContractUtil";
import TextF from "../HomeComponents/TextF";
import { client } from "../University/Certificate";
import "./SjobRow.css";
import MarkleeHash from "../../../MerkleeTree/MerkleeTree";


const SjobRow = ({ job, index}) => {
  const [status, setStatus] = useState("NOT APPLIED");
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState(null);
  const [certificateId, setCertificateId] = useState("");
  const [show, setShow] = useState(false);

  //   const [current, setCurrent] = useState(0);
  useEffect(() => {
    checkStatus();
  }, [refresh]);

  const checkStatus = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods
      .jobStatus(job["jobId"], job["postedBy"])
      .call({
        from: accountsCo[0],
      });
    console.log("result in students  check status  ", result);
    setStatus(result);
  };
  const applyHandler = async () => {
    console.log("in applyhnadler ");
    if (file === null) {
      alert("Please Upload your Certificate");
      return;
    }
    if (certificateId === "") {
      alert("Please Enter your Certificate Id");
      return;
    }
    const created = await client.add(file);
    console.log("created in apply handler ", created.path);

    const hash3 = MarkleeHash([certificateId.toString(), created.path.toString()]);
    console.log("hash2",hash3)
    localStorage.setItem('merkleehash3',hash3);

    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods
      .applyJob(job["postedBy"], job["jobId"], created.path, certificateId)
      .send({
        from: accountsCo[0],
      });
    console.log("result in students  apply  ", result);
    setRefresh(!refresh);
    setShow(false);
  };
  return (
    <>
      <tr className="tableHeading">
        <td>{index}</td>

        <td>{job["companyName"]} </td>
        <td>{job["jobName"]}</td>
        <td className="addressCopy">{job["salary"]}</td>
        <td>{job["noOfApplied"]}</td>
        <td>
          {status === "APPLIED" ? (
            <p>APPLIED</p>
          ) : status === "NOT APPLIED" ? (
            show === true ? (
              <p className="downloadButton" onClick={() => setShow(false)}>
                Cancel
              </p>
            ) : (
              <p className="downloadButton" onClick={() => setShow(true)}>
                APPLY
              </p>
            )
          ) : status === "HIRED" ? (
            <p>HIRED</p>
          ) : (
            // )
            <p>REJECTED</p>
          )}
        </td>
      </tr>
      {show === true && (
        <tr>
          <td colSpan={6} style={{ width: "100%" }}>
            <div className="pop">
              {file ? (
                <div className="popPic">
                  <p>{file.name}</p>
                  <button
                    className="popButton"
                    //   style={{ backgroundColor: "crimson" }}
                    onClick={() => setFile(null)}
                  >
                    Cancel Pic
                  </button>
                </div>
              ) : (
                <input
                  id="file"
                  type={"file"}
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                ></input>
              )}
              <TextF
                name={"CERTIFICATE ID"}
                data={certificateId}
                setValue={setCertificateId}
                con={false}
              ></TextF>
              <button className="popButton" onClick={applyHandler}>
                Apply
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default SjobRow;