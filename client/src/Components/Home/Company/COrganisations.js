import React, { useEffect } from "react";
import { webFunction } from "../../ContractUtil";
import NoStudentsImage from "../../../Images/Certificate.png";

const COrganisations = () => {
  const [organisations, setOrganisations] = React.useState([]);

  useEffect(() => {
    getAllOrganisations();
  }, []);

  const getAllOrganisations = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.getAllOrganisations().call({
      from: accounts[0],
    });
    console.log("result in company get all jobs  posted ", result);
    setOrganisations(result);
  };

  return (
    <div className="ustudent">
      {organisations.length === 0 ? (
        <div className="noStudents">
          <img src={NoStudentsImage}></img>

          <p>There are No Organisations in Network </p>
        </div>
      ) : (
        <div>
          <table className="table">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Address</th>
              <th>No Of Certificates</th>
              <th>No Of Students</th>
            </tr>
            {/* <div className="tableBorder"></div> */}
            {organisations.map((organisation, index) => {
              return (
                <tr className="tableHeading">
                  <td>{index}</td>
                  <td>{organisation["name"]}</td>
                  <td className="addressCopy">
                    {organisation["addr"]}
                    <i
                      class="fa-solid fa-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(organisation["addr"]);
                      }}
                    ></i>
                  </td>
                  <td className="addressCopy">
                    {organisation["noOfCertificates"]}
                  </td>
                  <td>{organisation["noOfStudents"]}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default COrganisations;
