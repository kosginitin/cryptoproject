import React, { useContext, useEffect, useState } from "react";
import { webFunction, webFunctionTwo } from "../../ContractUtil";
import { HomeContext } from "../Home";
import "./CVertificationRow.css";
const CVerificationRow = ({ addr, ipfs, cId, jId, setTopRefresh }) => {
  const { allCertificates, setAllCertificates } = useContext(HomeContext);
  const [student, setStudent] = useState({});
  const [certificate, setCertificate] = useState({});
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifyBut, setVerifyBut] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // console.log("cId addr ipfs jId ", cId, " ", addr, " ", ipfs, " ", jId);
    getStudentDetails();
    getCertificateDetails();
    checkVerification();
    checkActive();
  }, [refresh]);

  const getCertificateDetails = async () => {
    console.log("cId", cId);
    for (var i = 0; i < allCertificates.length; i++) {
      if (allCertificates[i].uniqueId === cId) {
        console.log("certification details is ", allCertificates[i]);
        setCertificate(allCertificates[i]);
        break;
      }
    }
  };

  const getStudentDetails = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.getStudentDetail(accounts[0]).call({
      from: accounts[0],
    });
    console.log("student in result in cverification row ", result);
    setStudent(result);
  };
  const checkVerification = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods.checkVerification(jId, addr).call({
      from: accountsCo[0],
    });
    console.log("result in cverification row check verification ", result);
    if (result === "Verified") {
      setVerifyBut(true);
    }
  };
  const checkActive = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods.isActive(jId).call({
      from: accountsCo[0],
    });
    console.log("result in cverification row check active ", result);
    setIsActive(result);
  };
  const verifyHandler = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    //if (ipfs === certificate.ipfs) {
    if (localStorage.getItem('merkleehash1') === localStorage.getItem('merkleehash2') && localStorage.getItem('merkleehash1') === localStorage.getItem('merkleehash3')) {
      console.log("verified");
      console.log("cId", cId);
      console.log("jId", jId);
      console.log("addr", addr);

      const result = await contractCo.methods.verified(jId, addr).send({
        from: accountsCo[0],
      });
      console.log("result in verify Handler is  ", result);

      setVerified(true);
    }
    setShow(true);
  };
  const rejectHandler = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods.rejected(jId, addr).send({
      from: accountsCo[0],
    });
    setShow(false);
    setRefresh(!refresh);
    // setVerified(false);
    setTopRefresh(true);
  };

  const hireHandler = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods.setHired(jId, addr).send({
      from: accountsCo[0],
    });
    console.log("result in verify Handler is  ", result);
    setShow(false);
    setRefresh(!refresh);
    // setVerified(false);
    setTopRefresh(true);
  };

  return (
    <>
      <div className="verifyRow">
        <div>
          <p>{student[0]}</p>
          <p>{student[2]}</p>
        </div>
        {verifyBut ? (
          isActive ? (
            <div className="row">
              <p className="downloadButton" onClick={hireHandler}>
                Hire
              </p>
              <p className="downloadButton" onClick={rejectHandler}>
                Reject
              </p>
            </div>
          ) : (
            <p>HIRED</p>
          )
        ) : (
          <button className="popButton" onClick={verifyHandler}>
            Verify
          </button>
        )}
      </div>
      {show && (
        <div className="requestBox">
          <p>{verified ? "Verified" : "Not Verified"}</p>
          {verified ? (
            <button
              onClick={() => {
                setShow(false);
                setRefresh(!refresh);
              }}
            >
              Continue
            </button>
          ) : (
            <button onClick={rejectHandler}>Reject</button>
          )}
        </div>
      )}
    </>
  );
};

export default CVerificationRow;