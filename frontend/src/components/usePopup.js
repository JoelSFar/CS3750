import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import "./popUp.css";



export default function UsePop(props) {

    const navigate = useNavigate();
    const [role, setUse] = useState('');

    const handleUseChange = (event) => {
        setUse(event.target.value);
    };

    return(props.trigger) ? (
        <>
                
            <div>
                <input type="radio" id="customer" name="fav_language" value="withdrawl" onChange={handleUseChange} />
                <label htmlFor="customer">Withdrawl</label>
                <input type="radio" id="employee" name="fav_language" value="store" onChange={handleUseChange} />
                <label htmlFor="employee">Store</label>
                <input type="radio" id="admin" name="fav_language" value="deposit" onChange={handleUseChange} />
                <label htmlFor="admin">Deposit</label>
                <div className='input'>
                <h2>Input amount: </h2>
                <input ></input>
                </div>
                </div>
                {props.children}
                
        
        
        </>
    ) : "";

}