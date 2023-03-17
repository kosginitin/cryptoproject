import React, { useEffect } from "react";
import { webFunctionTwo } from "../../ContractUtil";

const SProposalRow = ({ uniqueId, index }) => {
  const [job, setJob] = React.useState({});
  useEffect(() => {
    getJob();
  }, []);
  const getJob = async () => {
    console.log("getJob function in SProposalRow");
    const { contractCo, accountsCo } = await webFunctionTwo();
    const result = await contractCo.methods.getJob(uniqueId).call({
      from: accountsCo[0],
    });
    console.log(
      "result in students  get all jobs  applied proposals  ",
      result
    );
    setJob(result);
  };

  return (
    <tr>
      <td>{index}</td>
      <td>{job[0]}</td>
      <td>{job[3]}</td>
      <td>salary</td>
      <td>{job[2]}</td>
      <td>{job[4]}</td>
    </tr>
  );
};

export default SProposalRow;
