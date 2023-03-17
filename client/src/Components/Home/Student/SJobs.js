import React, { useEffect } from "react";
import { webFunctionTwo } from "../../ContractUtil";
import SjobRow from "./SjobRow";
import NoStudentsImage from "../../../Images/Certificate.png";

const SJobs = () => {
  const [jobs, setJobs] = React.useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods.getAllJobs().call({
      from: accountsCo[0],
    });
    console.log("all the jobs  ------------------- ", result);
    setJobs(result);
  };
  return (
    <div className="ustudent">
      {jobs.length === 0 ? (
        <div className="noStudents">
          <img src={NoStudentsImage}></img>

          <p>There are No JOBS posted by Companies</p>
        </div>
      ) : (
        <div>
          <table className="table">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Job Name</th>
              <th>Salary</th>
              <th>No Of Applications</th>
              <th>Status</th>
            </tr>
            {/* <div className="tableBorder"></div> */}
            {jobs.length > 0 &&
              jobs.map((job, index) => (
                <SjobRow job={job} index={index}></SjobRow>
              ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default SJobs;
