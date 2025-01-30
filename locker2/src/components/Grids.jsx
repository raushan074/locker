import React, { useEffect, useState, useCallback } from "react";
import "./grids.css";
import { Popup } from "./Popup";
import { useNavigate } from "react-router-dom";
import reservedImage from "../images/reserved.png"
import openImage from "../images/open.png"
import selectedImage from "../images/selected.png"

const Grids = () => {

    const navigate = useNavigate();

    const rend1 = parseInt(localStorage.getItem("rows") || "0", 10);
    const rend2 = parseInt(localStorage.getItem("columns") || "0", 10);
    
    useEffect(() => {
        if (rend1 === 0 || rend2 === 0 || isNaN(rend1) || isNaN(rend2)) {
            navigate("/");
        }
    }, [rend1, rend2, navigate]);
    

  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [ele, setEle] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [reserves, setReserves] = useState([]);
  const [opens, setOpens] = useState([]);

  const handlePopup = (x) => {
    console.log(x);
    setEle(x);
    setOpenPopup(true);
  };

  const updateFromStorage = useCallback(() => {
    const storedReserves = JSON.parse(localStorage.getItem("reserves")) || [];
    const storedOpens = JSON.parse(localStorage.getItem("opens")) || [];
    
    setReserves(storedReserves);
    setOpens(storedOpens);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "reserves" || e.key === "opens") {
        updateFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [updateFromStorage]);

  useEffect(() => {
    const storedRows = parseInt(localStorage.getItem("rows")) || 0;
    const storedColumns = parseInt(localStorage.getItem("columns")) || 0;
    
    setRows(storedRows);
    setColumns(storedColumns);
    updateFromStorage();
  }, [updateFromStorage]);

  useEffect(() => {
    const interval = setInterval(updateFromStorage, 500);
    return () => clearInterval(interval);
  }, [updateFromStorage]);

  const generateDivs = (gridIndex) =>
    Array.from({ length: rows }, (_, index) => {
      const cellNumber = gridIndex * rows + index + 1;
      const isReserved = reserves.includes(cellNumber);
      const isOpen = opens.includes(cellNumber);
      const isSelected = ele === cellNumber;

      return (
        <div
          onClick={() => handlePopup(cellNumber)}
          key={`${gridIndex}-${index}`}
          className={`box rows ${isReserved ? "res" : ""} ${
            isOpen ? "opn" : ""
          } ${isSelected ? "selected" : ""}`}
        >
          <div className="num">{cellNumber}</div>
        </div>
      );
    });

  const gridss = Array.from({ length: columns }, (_, index) => (
    <div key={index} className="box3 columns">
      {generateDivs(index)}
    </div>
  ));

  return (
    <div style={{backgroundColor:"#F3F5F7", height:"100vh", margin:"0"}}>
        <h2 style={{fontWeight:"700", fontSize:"40", color:"#A7B3BF"}}>Lockers.</h2>
        <div style={{marginLeft: "40px", marginRight:"40px", backgroundColor:"#fff"}}>
        <div className="box2">{gridss}</div>
        <div style={{display:"flex", gap:"20px", justifyContent:"center", marginTop:"20px"}}>
            <div style={{display:"flex"}}>
                <img width={"12px"} height={"12px"} src={reservedImage} alt="reserved" />
                <p style={{marginTop:"-5px", marginLeft:"5px"}}>Reserved</p>
            </div>
            <div style={{display:"flex"}}>
                <img width={"12px"} height={"12px"} src={openImage} alt="open" />
                <p style={{marginTop:"-5px", marginLeft:"5px"}}>Open</p>
            </div>
            <div style={{display:"flex"}}>
                <img width={"12px"} height={"12px"} src={selectedImage} alt="selected" />
                <p style={{marginTop:"-5px", marginLeft:"5px"}}>Selected</p>
            </div>
        </div>
        {openPopup && (
            <Popup
            text={ele}
            closePopup={() => {
                setEle(null);
                setOpenPopup(false);
            }}
            />
        )}
        </div>
    </div>
  );
};

export default Grids;