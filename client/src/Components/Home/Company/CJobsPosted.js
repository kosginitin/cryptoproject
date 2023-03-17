import React, { useContext, useEffect } from "react";
import { webFunction, webFunctionTwo } from "../../ContractUtil";
import NoStudentsImage from "../../../Images/Certificate.png";
import { HomeContext } from "../Home";
import { dateTime } from "../University/UCertificates";

const CJobsPosted = () => {
  const [jobs, setJobs] = React.useState([]);
  const {
    setCurrentSlide,
    setVerification,
    verification,
    allCertificates,
    setAllCertificates,
  } = useContext(HomeContext);
  useEffect(() => {
    setVerification(null);
    getSpecificJobs();
    getAllCertificates();
  }, []);

  const getAllCertificates = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.getAllCertificates().call({
      from: accounts[0],
    });
    console.log("result in jobs posted  get all certificates ", result);
    setAllCertificates(result);
  };

  // useEffect(() => {
  //   if (verification !== null) {
  //     console.log("came into cjobpost to cveriifcation  ", verification);

  //   }
  // }, [verification]);

  const clickHandler = () => {
    setCurrentSlide(8);
  };

  const getSpecificJobs = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods.getSpecificJobs().call({
      from: accountsCo[0],
    });
    console.log("result in company get jobs posted ", result);
    setJobs(result);
  };

  const requestHandler = (job) => {
    // setRequestCertificate(certificate);
    setVerification(job);
    setCurrentSlide(11);

    // setRefreshHome((p) => !p);
  };
  return (
    <div className="ustudent">
      {jobs.length === 0 ? (
        <div className="noStudents">
          <img src={NoStudentsImage}></img>

          <p>There are No JoBs. Post Your First job</p>
          <button onClick={clickHandler}>Post Job</button>
        </div>
      ) : (
        <div>
          <table className="table">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Job Id</th>
              <th>Salary</th>
              <th>No Of Applications</th>
            </tr>
            {/* <div className="tableBorder"></div> */}
            {jobs.map((job, index) => {
              return (
                <tr className="tableHeading">
                  <td>{index}</td>
                  <td>{job["jobName"]}</td>
                  <td className="addressCopy">
                    {job["jobId"]}
                    <i
                      class="fa-solid fa-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(job["jobId"]);
                      }}
                    ></i>
                  </td>
                  <td className="addressCopy">{job["salary"]}</td>
                  <td>{job["noOfApplied"]}</td>
                  <td>
                    <div
                      className="continueCertificate"
                      onClick={() => requestHandler(job)}
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

export default CJobsPosted;
