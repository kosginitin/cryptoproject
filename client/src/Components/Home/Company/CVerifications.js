import React, { useContext, useEffect, useState } from "react";
import { webFunctionTwo } from "../../ContractUtil";
import { HomeContext } from "../Home";
import TextF from "../HomeComponents/TextF";
import TextFO from "../HomeComponents/TextFO";
import CVerificationRow from "./CVerificationRow";

const CVerifications = () => {
  const { verification, setVerification } = useContext(HomeContext);
  const [address, setAddress] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [ipfs, setIpfs] = useState([]);
  const [certificateIds, setCertificateIds] = useState([]);
  const [topRefresh, setTopRefresh] = useState(false);
  useEffect(() => {
    console.log("came into CVerifications ", verification);

    if (verification !== null) {
      getRequests();
    }
  }, [refresh, topRefresh]);

  const getRequests = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods
      .getRequests(verification.jobId)
      .call({
        from: accountsCo[0],
      });
    console.log("getRequests  not verified in verification is ", result);
    setAddress(result[0]);
    setIpfs(result[1]);
    setCertificateIds(result[2]);
    console.log(
      "result in cverification get all requests certiification ids  ",
      result[2]
    );
  };

  return (
    <div className="ustudent">
      {verification == null ? (
        <div className="noStudents">
          <p>Your Not Selected any job </p>
        </div>
      ) : (
        <div className="uProfile">
          <div>
            <TextF name="Job ID" data={verification.jobId}></TextF>
            <TextF name="Job Name" data={verification.jobName}></TextF>

            <TextFO
              name="No Of Applicants"
              data={verification.noOfApplied}
            ></TextFO>
            <TextFO name="Salary" data={verification.salary}></TextFO>
          </div>
          <div>
            {address.length === 0 ? (
              <div className="NoRequests">No Requests</div>
            ) : (
              ipfs.length > 0 &&
              certificateIds.length > 0 && (
                <div>
                  {address.map((addr, index) => (
                    <CVerificationRow
                      addr={addr}
                      ipfs={ipfs[index]}
                      cId={certificateIds[index]}
                      jId={verification.jobId}
                      setTopRefresh={setTopRefresh}
                    ></CVerificationRow>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CVerifications;
