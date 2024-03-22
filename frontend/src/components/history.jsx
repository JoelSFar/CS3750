import React, { useState } from "react";
import "./popUp.css";


function Record(data){
    
    return (
        <>
        </>
    )
}

const ModalTwo = ({open, onClose}) => {

    if (!open) return null; 

    const handleShowHistory = async () => {
        const response = await fetch("http://localhost:5001/history/:accountType", {
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
                    <button onClick={handleShowHistory}>Show History</button>
                </div>
            </div>
    );
};

export default ModalTwo; 