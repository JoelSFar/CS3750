import React, { useState } from "react";
import "./popUp.css";

const Modal = ({open, onClose}) => {


    const [from, setFrom] = useState('');
    const [target, setTarget] = useState('');
    const [amount, setAmmount] = useState('');
    if (!open) return null; 
    const accountChange = async () =>
    {
        console.log(from + " "+ target + " "+ amount)
        const change = await fetch('http://localhost:5001/transfer',
        {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({from: from, target: target, amount: amount}),
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
                        <input type="radio" id="customer" name="from" value="checking" onChange={handleFromChange}/>
                        <label htmlFor="customer" className="txt">Checking</label>
                        <input type="radio" id="employee" name="from" value="savings" onChange={handleFromChange}/>
                        <label htmlFor="employee" className="txt">Savings</label>
                        <input type="radio" id="admin" name="from" value="yield" onChange={handleFromChange}/>
                        <label htmlFor="admin" className="txt">High Yield</label>
                    </div>
                    
                    <div className="input">
                        <h2>Transfer To: </h2>
                        <input type="radio" id="test" name="target" value="checking" onChange={handleTargetChange}/>
                        <label htmlFor="customer" className="txt">Checking</label>
                        <input type="radio" id="testOne" name="target" value="savings" onChange={handleTargetChange}/>
                        <label htmlFor="employee" className="txt">Savings</label>
                        <input type="radio" id="testTwo" name="target" value="yield" onChange={handleTargetChange}/>
                        <label htmlFor="admin" className="txt">High Yield</label>
                    </div>
                  
                    <div className='input'>
                        <h2 className="txt">Input amount: </h2>
                        <input type='text' value={amount} onChange={(event) => setAmmount(event.target.value)}></input>
                    </div>
                    <button type="submit" onClick={accountChange}>Submit</button>
                </div>
            </div>
    );
};
export default Modal; 