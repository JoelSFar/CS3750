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
                    <h1>Hello World!!!</h1>
                </div>
            </div>
    );
};

export default ModalTwo; 