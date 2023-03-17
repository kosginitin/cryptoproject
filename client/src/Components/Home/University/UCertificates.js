import React, { useContext, useEffect, useState } from "react";
import { webFunction } from "../../ContractUtil";

import { HomeContext } from "../Home";
import NoStudentsImage from "../../../Images/Certificate.png";

const UCertificates = () => {
  const { requestCertificate, setRequestCertificate, setCurrentSlide } =
    useContext(HomeContext);
  const [certificates, setCertificates] = useState([]);
  // const { setCurrentSlide } = useContext(HomeContext);
  useEffect(() => {
    setRequestCertificate(null);
    studentHandler();
  }, []);

  // useEffect(() => {
  //   if (requestCertificate !== null) {
  //     setCurrentSlide(3);
  //   }
  // }, [requestCertificate]);

  const clickHandler = () => {
    setCurrentSlide(0);
  };
  const studentHandler = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.getAllCertificates().call({
      from: accounts[0],
    });
    console.log("result in ucertificates ", result);
    setCertificates(result);
  };
  const requestHandler = (certificate) => {
    setRequestCertificate(certificate);
    setCurrentSlide(3);
    // setRefreshHome((p) => !p);
  };

  return (
    <div className="ustudent">
      {certificates.length === 0 ? (
        <div className="noStudents">
          <img src={NoStudentsImage}></img>

          <p>There are No Certificates Added</p>
          <button onClick={clickHandler}>Add Certificate</button>
        </div>
      ) : (
        <div>
          <table className="table">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Unique ID</th>
              <th>Stuent Address</th>
              <th>Timestamp</th>
            </tr>
            {/* <div className="tableBorder"></div> */}
            {certificates.map((certificate, index) => {
              return (
                <tr className="tableHeading">
                  <td>{index}</td>
                  <td>{certificate[0]}</td>
                  <td className="addressCopy">
                    {certificate[1]}
                    <i
                      class="fa-solid fa-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(certificate[1]);
                      }}
                    ></i>
                  </td>
                  <td className="addressCopy">
                    {certificate[2]}{" "}
                    <i
                      class="fa-solid fa-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(certificate[2]);
                      }}
                    ></i>{" "}
                  </td>
                  <td>{dateTime(certificate[3])}</td>
                  <td>
                    <div
                      className="continueCertificate"
                      onClick={() => requestHandler(certificate)}
                    >
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default UCertificates;

export const dateTime = (timestamp) => {
  var date = new Date();

  return (date.toUTCString());
};