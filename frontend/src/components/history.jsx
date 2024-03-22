import React, { useState } from "react";
import "./popUp.css";


function Record(data){
    
    return (
        <>
        </>
    )
}

const ModalTwo = ({open, onClose}) => {

    const [form, setForm] = useState({
        account: "",
        type: "",
        amount: "",
        description: "",
      });

      const { account, type, amount, description } = form;

      const newAccount = { ... form };

    if (!open) return null; 

    const handleShowHistory = async () => {
        const response = await fetch("http://localhost:5001/history/${newAccount.type}", {
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

    // const accountChange = async () =>
    // {
    //     const change = await fetch('https://localhost:5001/transfer',
    //     {
    //         credentials: "include",
    //         method: "POST",
    //         body: JSON.stringify({from: from, target: target, ammount: ammount}),
    //         headers:
    //         {
    //             'Content-Type': 'application/json'
    //         },
    //     });
    //     const changeMade = await change.json();
    // };


    return(
            <div className="popUp">
                <div className="modalContainer">
                    <p onClick={onClose} className="txt">X</p>
                    <br></br>
                    <h1>History</h1>
                    <button onClick={handleShowHistory}>Show History for Checking Account</button>
                    <button onClick={handleShowEntireHistory}>Show History for Entire Account</button>
                </div>
            </div>
    );
};

export default ModalTwo; 