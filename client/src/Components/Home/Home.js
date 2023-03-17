import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import NavBarHome from "./NavBarHome";
import "./Home.css";
import Uprofile from "./University/Uprofile";
import UStudents from "./University/UStudents";
import UCertificates from "./University/UCertificates";
import URequest from "./University/URequest";
import SProfile from "./Student/SProfile";
import SCertificate from "./Student/SCertificate";
import SJobs from "./Student/SJobs";
import SProposals from "./Student/SProposals";
import CProfile from "./Company/CProfile";
import CJobsPosted from "./Company/CJobsPosted";
import COrganisations from "./Company/COrganisations";
import CVerifications from "./Company/CVerifications";
export const HomeContext = createContext();

const Slide = [
  <Uprofile />,
  <UStudents />,
  <UCertificates />,
  <URequest />,
  <SProfile />,

  <SCertificate />,
  <SJobs />,
  <SProposals />,
  <CProfile />,
  <CJobsPosted />,
  <COrganisations />,
  <CVerifications />,
];
const Home = () => {
  const { registerName, setRegisterName } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState();
  const [profileRefresh, setProfileRefresh] = useState(false);
  const [requestCertificate, setRequestCertificate] = useState(null);
  const [verification, setVerification] = useState(null);
  const [allCertificates, setAllCertificates] = useState([]);

  useEffect(() => {
    console.log("registerName in home ", registerName);

    console.log("came into home");
    if (registerName === "University") {
      setCurrentSlide(1);
    }
    if (registerName === "Student") {
      setCurrentSlide(5);
    }
    if (registerName === "Company") {
      setCurrentSlide(9);
    }
  }, [registerName]);
  useEffect(() => {
    console.log("useeff in home in home ", registerName);
    if (registerName.length > 0) {
      localStorage.setItem("registerName", registerName);
    } else {
      const ldata = localStorage.getItem("registerName", registerName);
      console.log("ldata", ldata);
      setRegisterName(ldata);
    }
  }, []);
  window.onload = () => {
    console.log("came into window.onload registerName in home ", registerName);
  };

  return (
    <HomeContext.Provider
      value={{
        allCertificates,
        setAllCertificates,
        currentSlide,
        setCurrentSlide,
        setProfileRefresh,
        profileRefresh,
        requestCertificate,
        setRequestCertificate,
        verification,
        setVerification,
      }}
    >
      <div className="homeFinal">
        <NavBarHome registerName={registerName}></NavBarHome>
        <div>{Slide[currentSlide]}</div>
      </div>
    </HomeContext.Provider>
  );
};

export default Home;
