import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router";
//import UsePop from "./components/usePopup";
import Modal from './transferPop';



export default function Home() {
const navigate = useNavigate();
const [name, setName] = useState('');
const [role, setRole] = useState('');
const [open, setOpen] = useState(false);
const [use, setUse] = useState('');


useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("http://localhost:5001/prev", { method: 'GET', credentials: 'include'});
        const data = await response.json();
        if (data) {
            const userInfoFetch = await fetch("http://localhost:5001/personalData", { method: 'GET', credentials: 'include'});
            const userdata = await userInfoFetch.json();
            console.log(userdata);
            setName(userdata.userName);
            setRole(userdata.role);
        } else {
            console.log("no session");
        }
    };
    fetchData();
}, []);


const handleUseChange = (event) => {
    setUse(event.target.value);
};

const handleOpen = async () =>
{
    setOpen(true);
}

const handleclick = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/logout", { method: 'GET', credentials: 'include'})
    alert("logged out");
    navigate("/");
}

return (
    <>
    <h1>YOU LOGGED IN</h1>
    <button>Checking</button>
    <button>Savings</button>
    <button>High Yield</button>
    <div>
        <input type="radio" id="customer" name="fav_language" value="withdrawl" onChange={handleUseChange} />
        <label htmlFor="customer">Withdrawl</label>
        <input type="radio" id="admin" name="fav_language" value="deposit" onChange={handleUseChange} />
        <label htmlFor="admin">Deposit</label>
        <div className='input'>
            <h2>Input amount: </h2>
            <input type='text'></input>
        </div>
        <div className='input'>
            <button>Submit</button>
            <button onClick={() => setOpen(true)}>Transfer</button>
            <button onClick={handleclick}>Logout</button>
        </div>
    </div>
    <Modal open = {open} onClose={() => setOpen(false)} />



    </>
)
}