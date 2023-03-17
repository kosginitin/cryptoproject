import React from "react";
import "./DropDown.css";
const race = [
  "Azure Female",
  "Iron Dwarf",
  "Highborn Human",
  "Lowland Human",
  "Mountain Dwarf",
  "Scythian Elf",
  "Woodland Elf",
];

const DropDown = ({ items, setHaveText, haveText, con }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleText = (ev) => {
    setHaveText(ev.currentTarget.textContent);
  };

  const itemList = (props) => {
    const list = props.map((item) => (
      <div
        onClick={con === false ? handleText : () => {}}
        className="dropdown__item"
        key={item[0].toString()}
      >
        {item[0]}
      </div>
    ));

    return <div className="dropdown__items"> {list} </div>;
  };
  return (
    <div
      className={isOpen ? "dropdown active" : "dropdown"}
      onClick={handleClick}
    >
      <div className="dropdown__text">
        {!haveText ? "Select University" : haveText}
      </div>
      {itemList(items)}
    </div>
  );
};

export default DropDown;
