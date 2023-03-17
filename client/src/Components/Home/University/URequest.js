import React, { useContext, useEffect, useState } from "react";
import { webFunction } from "../../ContractUtil";
import { HomeContext } from "../Home";
import NoStudentsImage from "../../../Images/Certificate.png";
import TextF from "../HomeComponents/TextF";
import TextFO from "../HomeComponents/TextFO";
import { dateTime } from "./UCertificates";
import "./URequests.css";

const URequest = () => {
  const [refresh, setRefresh] = useState(false);
  const { requestCertificate, setRequestCertificate, setCurrentSlide } =
    useContext(HomeContext);
  const [requests, setRequestes] = useState([]);

  useEffect(() => {
    if (requestCertificate !== null) {
      assignRequests();
    }
  }, [refresh]);
  const giveAcess = async (addr, cuniqueId) => {
    console.log("request checker ");

    console.log("addr", addr);
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.giveAcess(addr, cuniqueId).send({
      from: accounts[0],
    });
    console.log("result in request  acesss ", result);
    setRefresh(!refresh);
  };

  const assignRequests = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods
      .requests(requestCertificate[1], requestCertificate.issuedTo)
      .call({
        from: accounts[0],
      });
    console.log("result in ucertificates assign rquests ", result);
    setRequestes(result);
  };

  // useEffect(() => {
  //   return () => {
  //     setRequestCertificate(null);
  //   };
  // }, []);
  return (
    <div className="ustudent">
      {requestCertificate == null ? (
        <div className="noStudents">
          <img src={NoStudentsImage}></img>

          <p>Your Not Selected any Certificate </p>
        </div>
      ) : (
        <div className="uProfile">
          <div>
            <TextF
              name="Certificate ID"
              data={requestCertificate.uniqueId}
            ></TextF>
            <TextF name="Student Name" data={requestCertificate[0]}></TextF>
            <TextF
              name="Student Address"
              data={requestCertificate.issuedTo}
            ></TextF>
            <TextF
              name="Organisation Address"
              data={requestCertificate.issuedBy}
            ></TextF>
            <TextFO
              name="Issued Time"
              data={dateTime(requestCertificate[3])}
            ></TextFO>
          </div>
          <div>
            {requests.length === 0 ? (
              <div className="NoRequests">No Requests</div>
            ) : (
              <div>
                {requests.map((request, index) => (
                  <div className="requestBox">
                    <p>{request}</p>
                    <button
                      onClick={() => {
                        giveAcess(
                          requestCertificate.issuedTo,
                          requestCertificate.uniqueId
                        );
                      }}
                    >
                      Give Acess
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default URequest;
