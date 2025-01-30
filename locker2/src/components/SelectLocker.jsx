import React, { useState } from "react";
import "./select-locker.css";

const SelectLocker = ({ text, closePop }) => {
  const [selection, setSelection] = useState("");

  let reserves = JSON.parse(localStorage.getItem("reserves")) || [];
  let opens = JSON.parse(localStorage.getItem("opens")) || [];

  const handleSelection = (resp) => {
    console.log(resp);
    setSelection(resp);

    if (resp === "reserve") {
      if (!reserves.includes(text)) {
        reserves.push(text);
        localStorage.setItem("reserves", JSON.stringify(reserves));
      }
    } else if (resp === "open") {
      if (!opens.includes(text)) {
        opens.push(text);
        localStorage.setItem("opens", JSON.stringify(opens));
      }
    } else if (resp === "close") {
      reserves = reserves.filter((elem) => elem !== text);
      opens = opens.filter((elem) => elem !== text);
      localStorage.setItem("reserves", JSON.stringify(reserves));
      localStorage.setItem("opens", JSON.stringify(opens));
    }

    localStorage.setItem("selection", resp);
    closePop();
  };

  return (
    <div className="select">
      <div className="child-container">
        <div className="buttons">
          <div>
            <button className="reserve" onClick={() => handleSelection("reserve")}>
              Reserve Locker
            </button>
          </div>
          <div>
            <button className="open" onClick={() => handleSelection("open")}>
              Open Locker
            </button>
          </div>
          <div>
            <button className="close" onClick={() => handleSelection("close")}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectLocker;
