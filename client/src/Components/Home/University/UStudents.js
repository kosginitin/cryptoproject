import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import OverAll from "../../../contracts/OverAll.json";
import { webFunction } from "../../ContractUtil";
import "./UStudent.css";
import NoStudentsImage from "../../../Images/NoStudents.png";
import { HomeContext } from "../Home";
const UStudents = () => {
  const { setCurrentSlide } = useContext(HomeContext);
  const [studentData, setStudentsData] = useState([]);

  useEffect(() => {
    studentHandler();
  }, []);
  const clickHandler = () => {
    setCurrentSlide(0);
  };
  const studentHandler = async () => {
    const { contract, accounts } = await webFunction();
    const result = await contract.methods.getAllStudents().call({
      from: accounts[0],
    });
    console.log("result in ustudents ", result);
    setStudentsData(result);
  };
  return (
    <div className="ustudent">
      {studentData.length !== 0 ? (
        <div>
          <table className="table">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Address</th>
              <th>Unique ID</th>
              <th>No of Cert</th>
            </tr>
            {/* <div className="tableBorder"></div> */}
            {studentData.map((student, index) => {
              return (
                <tr className="tableHeading">
                  <td>{index}</td>
                  <td>{student[0]}</td>
                  <td className="addressCopy">
                    {student[1]}
                    <i
                      class="fa-solid fa-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(student[1]);
                      }}
                    ></i>
                  </td>
                  <td className="addressCopy">
                    {student[2]}{" "}
                    <i
                      class="fa-solid fa-copy"
                      onClick={() => {
                        navigator.clipboard.writeText(student[2]);
                      }}
                    ></i>{" "}
                  </td>
                  <td>{student[3]}</td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <div className="noStudents">
          <img src={NoStudentsImage}></img>

          <p>There are No Students Added</p>
          <button onClick={clickHandler}>Add Students</button>
        </div>
      )}
    </div>
  );
};

export default UStudents;
