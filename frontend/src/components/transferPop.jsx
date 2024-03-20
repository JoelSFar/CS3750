import React from "react";
import "./popUp.css";

const Modal = ({open, onClose}) => {
    if (!open) return null; 
    return(
        
            <div className="popUp">
                <div className="modalContainer">
                    <p onClick={onClose} className="txt">X</p>
                    <br></br>
                    <input type="radio" id="customer" name="fav_language" value="withdrawl" />
                    <label htmlFor="customer" className="txt">Checking</label>
                    <input type="radio" id="employee" name="fav_language" value="store" />
                    <label htmlFor="employee" className="txt">Savings</label>
                    <input type="radio" id="admin" name="fav_language" value="deposit" />
                    <label htmlFor="admin" className="txt">High Yield</label>
                    <br></br>
                    <div className='input'>
                        <h2 className="txt">Input amount: </h2>
                        <input type='text'></input>
                    </div>
                    <button type="submit">Submit</button>
                </div>
            </div>
        
        
    );
};
export default Modal; 