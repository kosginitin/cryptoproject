import React, {
  useEffect,
  createContext,
  useRef,
  createRef,
  useState,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { HomeContext } from "./Home";
import { COMPANY_NAV, STUDENT_NAV, UNIVERSITY_NAV } from "./HomeUtilis";
import "./NavBarHome.css";

const data = ["profile", "Events", "Adoptions", "More"];
const NavBarHome = ({ registerName }) => {
  const navigate = useNavigate();
  const { currentSlide, setCurrentSlide, refreshHome } =
    useContext(HomeContext);
  const { setRegisterName } = useContext(AppContext);

  useEffect(() => {
    if (registerName.length === 0) {
      navigate("/");
    }
  }, [registerName]);
  useEffect(() => {
    if (currentSlide == 0) {
      clickHandler(0, 0);
    }
    if (currentSlide == 3) {
      clickHandler(3, 3);
    }
    if (currentSlide == 11) {
      clickHandler(3, 11);
    }
  }, [currentSlide]);
  const myRefs = useRef([]);
  myRefs.current = data.map((element, i) =>
    myRefs.current[i] ? myRefs.current[i] : createRef(null)
  );
  const [currentIndex, setCurrentIndex] = useState(1);
  useEffect(() => {
    console.log("registerName", registerName);

    myRefs.current[1].current.style.background = "var(--secondColor--)";
    myRefs.current[1].current.style.color = "white";
  }, []);

  const mouseHandler = (inde) => {
    if (inde !== currentIndex) {
      myRefs.current[inde].current.style.background = "aliceblue";
    }
  };
  const mouseOut = (inde) => {
    if (inde !== currentIndex) {
      myRefs.current[inde].current.style.background = "transparent";
    }
  };

  // logout clickHandler

  const logoutHandler = () => {
    setRegisterName("");
  };
  //   refsss

  const clickHandler = (index, id) => {
    console.log("index clicked ", index, " id is ", id);

    data.forEach((value, inde) => {
      if (inde === index) {
        console.log("index is ", inde);
        setCurrentIndex(inde);
        setCurrentSlide(id);
        myRefs.current[inde].current.style.background = "var(--secondColor--)";
        myRefs.current[inde].current.style.color = "white";
      } else {
        myRefs.current[inde].current.style.background = "transparent";
        myRefs.current[inde].current.style.color = "grey";
      }
    });
  };

  //   rendering function
  return (
    <div className="navBarHome">
      <h1>EEC</h1>
      {registerName == "University" ? (
        <div>
          {UNIVERSITY_NAV.map((item, index) => (
            <div
              //   tabIndex={0}
              ref={myRefs.current[index]}
              onClick={() => clickHandler(index, item.id)}
              onMouseOver={() => mouseHandler(index)}
              onMouseOut={() => mouseOut(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      ) : registerName == "Student" ? (
        <div>
          {STUDENT_NAV.map((item, index) => (
            <div
              //   tabIndex={0}
              ref={myRefs.current[index]}
              onClick={() => clickHandler(index, item.id)}
              onMouseOver={() => mouseHandler(index)}
              onMouseOut={() => mouseOut(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {COMPANY_NAV.map((item, index) => (
            <div
              //   tabIndex={0}
              ref={myRefs.current[index]}
              onClick={() => clickHandler(index, item.id)}
              onMouseOver={() => mouseHandler(index)}
              onMouseOut={() => mouseOut(index)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
      <button className="customButton" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default NavBarHome;
