import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router";
//import UsePop from "./components/usePopup";
import Modal from './transferPop';
import ModalTwo from './history';



export default function Home() {
const navigate = useNavigate();
const [name, setName] = useState('');
const [role, setRole] = useState('');
const [open, setOpen] = useState(false);
const [history, setHistory] = useState(false);
const [action, setUse] = useState('');
const [ammount, setAmmount] = useState('');
const [account, setAccount] = useState('');


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


const accountChange = async () =>
{
    const change = await fetch('https://localhost:5001/deposit',
    {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({action: action, ammount: ammount, account: account}),
        headers:
        {
            'Content-Type': 'application/json'
        },
    });
    const changeMade = await change.json();
};


const handleAccountChange = (event) =>
{
    setAccount(event.target.value);
};

const handleUseChange = (event) => {
    setUse(event.target.value);
};

const handleHistory = async () =>
{
    setHistory(true);
}

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
    <input type="radio" id="checking" name="fav_language" value="checking" onChange={handleAccountChange} />
        <label htmlFor="checking">Checking</label>
        <input type="radio" id="savings" name="fav_language" value="savings" onChange={handleAccountChange} />
        <label htmlFor="savings">Savings</label>
        <input type="radio" id="yield" name="fav_language" value="yield" onChange={handleAccountChange} />
        <label htmlFor="yield">High Yield</label>
    <div>
        <input type="radio" id="customer" name="fav_language" value="w" onChange={handleUseChange} />
        <label htmlFor="customer">Withdrawl</label>
        <input type="radio" id="admin" name="fav_language" value="d" onChange={handleUseChange} />
        <label htmlFor="admin">Deposit</label>
        <div className='input'>
            <h2>Input amount: </h2>
            <input type='text' value={ammount} onChange={(event) => setAmmount(event.target.value)}></input>
        </div>
        <div className='input'>
            <button>Submit</button>
            <button onClick={() => setOpen(true)}>Transfer</button>
            <button onClick={() => setHistory(true)}>History</button>
            <button onClick={handleclick}>Logout</button>
        </div>
    </div>
    <Modal open = {open} onClose={() => setOpen(false)} />
    <ModalTwo open ={history} onClose={() => setHistory(false)} />
    </>
)
}