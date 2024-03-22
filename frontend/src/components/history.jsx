import React, { useState } from "react";
import "./popUp.css";

const ModalTwo = ({open, onClose}) => {
    const [selectedAccount, setSelectedAccount] = useState('');

    if (!open) return null; 

    const handleShowHistory = async () => {
        const response = await fetch("http://localhost:5001/history/${selectedAccount.type}", {
        credentials: "include",
        method: "GET",
        });
        let data = await response.json();
        console.log(data.history);

    };

    const handleShowEntireHistory = async () => {
        const response = await fetch("http://localhost:5001/history", {
        credentials: "include",
        method: "GET",
        });
        let data = await response.json();
        console.log(data.history);

    };

    const handleAccountChange = (event) =>
    {
    setSelectedAccount(event.target.value);
    };

    return(
            <div className="popUp">
                <div className="modalContainer">
                    <p onClick={onClose} className="txt">X</p>
                    <br></br>
                    <h1>History</h1>
                    <input type="radio" id="checking" name="selected_account" value="checking" onChange={handleAccountChange} />
                    <label htmlFor="checking">Checking</label>
                    <input type="radio" id="savings" name="selected_account" value="savings" onChange={handleAccountChange} />
                    <label htmlFor="savings">Savings</label>
                    <input type="radio" id="yield" name="selected_account" value="yield" onChange={handleAccountChange} />
                    <label htmlFor="yield">High Yield</label>
                    <button onClick={handleShowHistory}>Show History for Specific Account</button>
                    <button onClick={handleShowEntireHistory}>Show History for Entire Account</button>
                </div>
            </div>
    );
};

export default ModalTwo; 