import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router";
//import UsePop from "./components/usePopup";
import Modal from './transferPop';
import ModalTwo from './history';


function AccountInfo({ name, balance }) {
    return (
        <div className='AccountInfo'>
            <h2>{name}</h2>
            <p>Balance: {balance}</p>
        </div>
    );
}

function AccountsList({ accounts }) {
    console.log("in accountslist: ", accounts);

    return (
        <div>
            {accounts.map((account, index) => (
                <AccountInfo key={index} name={account.name} balance={account.balance? account.balance: "0"} />
            ))}
        </div>
    );
}



export default function Home() {
const navigate = useNavigate();
const [loading, setLoading] = useState(true);
const [accountInfo, setAccountInfo] = useState({});
const [open, setOpen] = useState(false);
const [historyViewable, setHistoryViewable] = useState(false);
const [action, setUse] = useState('');
const [ammount, setAmmount] = useState('');
const [account, setAccount] = useState('');


useEffect(() => {
    const fetchData = async () => {

        try {
            console.log("in home use effect");
            const response = await fetch("http://localhost:5001/prev", { method: 'GET', credentials: 'include'});
            const data = await response.json();
            if (data) {
                const userInfoFetch = await fetch("http://localhost:5001/accounts", { method: 'GET', credentials: 'include'});
                const userdata = await userInfoFetch.json();
                console.log("got user account data:", userdata);
                setAccountInfo(userdata.accounts);
                console.log("user data:", accountInfo);

            } else {
                console.log("no session");
                navigate("/");
            }
        } catch (error) {
            console.error('Failed in use effect:', error);
            
        } finally {
            setLoading(false);
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
    setHistoryViewable(true);
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

if (loading) {
    return <div>Loading...</div>;
}

return (
    <>
    <h1>YOU LOGGED IN</h1>
    <AccountsList accounts={accountInfo}/>
    <input type="radio" id="checking" name="selected_account" value="checking" onChange={handleAccountChange} />
        <label htmlFor="checking">Checking</label>
        <input type="radio" id="savings" name="selected_account" value="savings" onChange={handleAccountChange} />
        <label htmlFor="savings">Savings</label>
        <input type="radio" id="yield" name="selected_account" value="yield" onChange={handleAccountChange} />
        <label htmlFor="yield">High Yield</label>
    <div>
        <input type="radio" id="customer" name="withdraw_deposit" value="w" onChange={handleUseChange} />
        <label htmlFor="customer">Withdrawl</label>
        <input type="radio" id="admin" name="withdraw_deposit" value="d" onChange={handleUseChange} />
        <label htmlFor="admin">Deposit</label>
        <div className='input'>
            <h2>Input amount: </h2>
            <input type='text' value={ammount} onChange={(event) => setAmmount(event.target.value)}></input>
        </div>
        <div className='input'>
            <button>Submit</button>
            <button onClick={() => setOpen(true)}>Transfer</button>
            <button onClick={() => setHistoryViewable(true)}>History</button>
            <button onClick={handleclick}>Logout</button>
        </div>
            </div>
    <Modal open = {open} onClose={() => setOpen(false)} />
    <ModalTwo open ={historyViewable} onClose={() => setHistoryViewable(false)} />
    </>
)
}