import React, { useState } from "react";
import "./popUp.css";

const Modal = ({open, onClose}) => {


    const [from, setFrom] = useState('');
    const [target, setTarget] = useState('');
    const [ammount, setAmmount] = useState('');
    if (!open) return null; 
    const accountChange = async () =>
    {
        const change = await fetch('https://localhost:5001/transfer',
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({from: from, target: target, ammount: ammount}),
            headers:
            {
                'Content-Type': 'application/json'
            },
        });
        const changeMade = await change.json();
    };
    const handleFromChange = (event) =>
    {
        setFrom(event.target.value);
    };

    const handleTargetChange = (event) =>
    {
        setTarget(event.target.value);
    };

    return(
            <div className="popUp">
                <div className="modalContainer">
                    <p onClick={onClose} className="txt">X</p>
                    <br></br>
                    <div className="input">
                        <h2>Transfer From: </h2>
                        <input type="radio" id="customer" name="fav_language" value="withdrawl" onChange={handleFromChange}/>
                        <label htmlFor="customer" className="txt">Checking</label>
                        <input type="radio" id="employee" name="fav_language" value="store" onChange={handleFromChange}/>
                        <label htmlFor="employee" className="txt">Savings</label>
                        <input type="radio" id="admin" name="fav_language" value="deposit" onChange={handleFromChange}/>
                        <label htmlFor="admin" className="txt">High Yield</label>
                    </div>
                    
                    <div className="input">
                        <h2>Transfer To: </h2>
                        <input type="radio" id="customer" name="fav_language" value="withdrawl" onChange={handleTargetChange}/>
                        <label htmlFor="customer" className="txt">Checking</label>
                        <input type="radio" id="employee" name="fav_language" value="store" onChange={handleTargetChange}/>
                        <label htmlFor="employee" className="txt">Savings</label>
                        <input type="radio" id="admin" name="fav_language" value="deposit" onChange={handleTargetChange}/>
                        <label htmlFor="admin" className="txt">High Yield</label>
                    </div>
                  
                    <div className='input'>
                        <h2 className="txt">Input amount: </h2>
                        <input type='text' value={ammount} onChange={(event) => setAmmount(event.target.value)}></input>
                    </div>
                    <button type="submit">Submit</button>
                </div>
            </div>
    );
};
export default Modal; 