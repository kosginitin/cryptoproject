import React, { useEffect } from "react";
import { webFunctionTwo } from "../../ContractUtil";
import SProposalRow from "./SProposalRow";
import "./SProposal.css";
const SProposals = () => {
  const [applied, setApplied] = React.useState([]);
  useEffect(() => {
    studentApplied();
  }, []);

  const studentApplied = async () => {
    console.log("studentApplied");
    const { contractCo, accountsCo } = await webFunctionTwo();
    try {
      const result = await contractCo.methods.studentApplied().call({
        from: accountsCo[0],
      });
      console.log(
        "result in students  get all jobs  applied proposals  ",
        result
      );
      setApplied(result);
    } catch (err) {
      console.log("error in studentApplied ", err);
    }
  };
  return (
    <div className="ustudent">
      {applied.length === 0 ? (
        <div className="noStudents">
          <p>There are No Proposals.Apply for a job..</p>
        </div>
      ) : (
        <div>
          <p className="proposalHead">APPLIED</p>
          <table className="table">
            <tr>
              <th>Index</th>

              <th>Name</th>

              <th>Job Type</th>
              <th>Salary</th>
              <th>Job Location</th>
              <th>Company Name</th>
            </tr>
            {/* <div className="tableBorder"></div> */}
            {applied.map((uniqueId, index) => (
              <SProposalRow uniqueId={uniqueId} index={index}></SProposalRow>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default SProposals;
