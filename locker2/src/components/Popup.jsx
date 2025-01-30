import React from "react";
import "./Popup.css";
import SelectLocker from "./SelectLocker";
import crossImage from '../images/cross.png';

export const Popup = ({ text, closePopup }) => {
    const handlePopupClose=()=>{
        closePopup()
    }

  return (
        <div className="popup-container">
        <div className="popup-body">
            <div className='labell'>
                <div>Locker Selected: <h3 style={{display: 'inline'}}>{text}</h3></div>
                <div onClick={handlePopupClose}><img className='cross' width="20px" height="20px" src={crossImage} /></div>
            </div>
        <SelectLocker text={text} closePop={()=>closePopup()} />
        </div>
        </div>
  );
};