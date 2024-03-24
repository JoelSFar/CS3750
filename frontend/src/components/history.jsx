import React, { useState } from "react";
import "./popUp.css";

const ModalTwo = ({open, onClose}) => {
    const [selectedAccount, setSelectedAccount] = useState('');

    if (!open) return null; 

    const handleAccountChange = (event) =>
    {
        setSelectedAccount(event.target.value);
    };

    const handleShowHistory = async () => {
        const response = await fetch(`http://localhost:5001/history/${selectedAccount}`, {
        credentials: "include",
        method: "GET",
        });
        let data = await response.json();
        console.log(data.history);
        setSelectedAccount(data.history);
    };


    const handleShowEntireHistory = async () => {
        const response = await fetch("http://localhost:5001/history", {
        credentials: "include",
        method: "GET",
        });
        let data = await response.json();
        let history = data.history;
        let historyArray = new Array();
        for (var item in history) {
            if (history.hasOwnProperty(item)){
                historyArray.push(history[item]);
            }
        }
        console.log(historyArray);
        setSelectedAccount(data.history);

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
                    <h3>{selectedAccount}</h3>
                </div>
            </div>
    );
};

export default ModalTwo; 