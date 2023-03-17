import React, { useContext, useState } from "react";
import TextF from "../HomeComponents/TextF";
import "./Certificate.css";
import { create } from "ipfs-http-client";
import MarkleeHash from "../../../MerkleeTree/MerkleeTree";
import { webFunction } from "../../ContractUtil";
import { HomeContext } from "../Home";

const projectId = "2Hx7kdTXiLaDlOFDkTkPmb2jeEj";

const projectSecret = "f7bb549a49892a4c7ab820e9d4044038";

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

export const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// export const client = create("https://ipfs.infura.io:5001/api/v0");
const Certificate = () => {
  const { setProfileRefresh } = useContext(HomeContext);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [certificateUnique, setCertificateUnique] = useState("");
  const [bufferFile, setBufferFile] = useState(null);
  const [error, setError] = useState();
  const [ipfsHash, setIpfsHash] = useState(null);

  const uploadHandler = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }
    if (!studentId) {
      setError("Please enter student id");
      return;
    }
    if (!certificateUnique) {
      setError("Please enter certificate unique id");
      return;
    }
    if (studentId.length < 7) {
      setError("Please enter valid student id");
      return;
    }
    if (certificateUnique.length < 7) {
      setError("Please enter valid certificate unique id");
      return;
    }
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBufferFile(Buffer(reader.result));
    };
    try {
      const created = await client.add(file);
      const url = `https://infura-ipfs.io/ipfs/${created.path}`;
      // setUrlArr((prev) => [...prev, url]);
      console.log("url uploaded in ipfs ", url);
      setIpfsHash(created.path);
      const { contract, accounts } = await webFunction();
      try {
        console.log("studentId", studentId);
        console.log("certificateUnique", certificateUnique);
        console.log("ipfsHash", created.path);

        const merkleeHash = MarkleeHash([
          //studentId.toString(),
          certificateUnique.toString(),
          created.path.toString(),
        ]);
        console.log("certificateUnique", certificateUnique);
        console.log("ipfsHash", created.path);
        
        localStorage.setItem('merkleehash1',merkleeHash)
        console.log("merkleeHash", merkleeHash);
        try {
          const result = await contract.methods
            .addCertificate(
              created.path.toString(),
              merkleeHash,
              certificateUnique,
              studentId
            )
            .send({
              from: accounts[0],
            });

          setFile(null);
          setStudentId("");
          setCertificateUnique("");
          setProfileRefresh((p) => !p);
          console.log("result in adding certificate", result);
          if (result.status) {
            setError("");
          }
        } catch (e) {
          console.log("error in adding certificate", e);
          setError("Error in uploading");
        }
      } catch (e) {
        console.log("error in merkle tree", e);
      }
    } catch (error) {
      setError("Error in uploading file");
      console.log("error in ipfs ", error.message);
    }

    // console.log("merkleeHash ", merkleeHash);
  };
  return (
    <div className="addCertificate">
      <TextF
        name={"STUDENT ADDRESS"}
        data={studentId}
        setValue={setStudentId}
        con={false}
      ></TextF>
      <TextF
        name={"CERTIFICATE ID"}
        data={certificateUnique}
        setValue={setCertificateUnique}
        con={false}
      ></TextF>
      {file ? (
        <div className="pic">
          <p>{file.name}</p>
          <button
            className="customButton"
            style={{ backgroundColor: "crimson" }}
            onClick={() => setFile(null)}
          >
            Cancel Pic
          </button>
        </div>
      ) : (
        <input
          id="file"
          type={"file"}
          accept=".png,.jpeg,.jpg"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        ></input>
      )}
      <br />
      <p className="error">{error}</p>
      <button className="customButton" onClick={uploadHandler}>
        Upload
      </button>
    </div>
  );
};

export default Certificate;

// setFile(e.target.files[0]);
// setImage(URL.createObjectURL(e.target.files[0]));