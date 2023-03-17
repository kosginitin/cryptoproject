import React from "react";
import "./TextF.css";
const TextF = ({ name, data, setValue, con, psi, isi }) => {
  return (
    <div className="textF">
      <p style={{ fontSize: psi }}>{name}</p>
      <input
        style={{ fontSize: isi }}
        value={data}
        onChange={con === false ? (e) => setValue(e.target.value) : () => {}}
      ></input>
    </div>
  );
};

export default TextF;
