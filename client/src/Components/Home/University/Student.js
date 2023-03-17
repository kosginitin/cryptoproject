import React, { useContext, useState } from "react";
import { webFunction } from "../../ContractUtil";
import { HomeContext } from "../Home";
import TextF from "../HomeComponents/TextF";
import "./Student.css";
const Student = () => {
  const { setProfileRefresh } = useContext(HomeContext);
  const [uniqueid, setUniqueId] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [errors, setErrors] = useState("");

  const studentHandler = async () => {
    console.log("studentHandler");
    console.log("uniqueid", uniqueid);
    console.log("securityQuestion", securityQuestion);
    console.log("securityAnswer", securityAnswer);

    if (uniqueid == "" || securityQuestion == "" || securityAnswer == "") {
      setErrors("Please fill all fields");
      return;
    }
    if (uniqueid.length < 7) {
      setErrors("Please enter valid unique id");
      return;
    }
    if (securityQuestion.length < 12 || securityAnswer.length < 12) {
      setErrors("Please enter valid security question and answer");
      return;
    }
    setErrors("");
    const { contract, accounts } = await webFunction();
    try {
      const result = await contract.methods.addStudentUniqueID(uniqueid).send({
        from: accounts[0],
      });
      console.log("result in adding unique id", result);
      if (result.status) {
        setProfileRefresh((p) => !p);
        setUniqueId("");
        setSecurityQuestion("");
        setSecurityAnswer("");
      } else {
        setErrors("Student already exists");
      }
    } catch (e) {
      console.log("error in adding unique id", e);
      setErrors("StudentID already exists");
    }
  };
  return (
    <div className="studentAdd">
      <TextF
        name={"STUDENT UNIQUEID"}
        setValue={setUniqueId}
        con={false}
      ></TextF>
      <TextF
        name={"SECURITY QUESTION"}
        setValue={setSecurityQuestion}
        con={false}
      ></TextF>
      <TextF name={"ANSWER"} setValue={setSecurityAnswer} con={false}></TextF>
      {errors ? <p className="error">{errors}</p> : null}
      <button className="customButton" onClick={studentHandler}>
        Add Student
      </button>
    </div>
  );
};

export default Student;
