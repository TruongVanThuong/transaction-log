import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

export default function Register() {
    const navigate = useNavigate();
    const {http} = AuthUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [wallet, setWallet] = useState("");

    const submitForm = () =>{
        // api call
        http.post('/register',{email:email,password:password,name:name,phone:phone,address:address,wallet:wallet}).then((res)=>{
            navigate('/login')
        })
    }

    return(
        <div className="row justify-content-left pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register </h1>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='form-control' placeholder='Name' />
                    <br />
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                    <br />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' />
                    <br />
                    <input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' placeholder='Phone' />
                    <br />
                    <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} className='form-control' placeholder='Address' />
                    <br />
                    <input type='number' value={wallet} onChange={(e) => setWallet(e.target.value)} className='form-control' placeholder='Wallet' />
                    <br />
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Register</button>
                </div>
            </div>
        </div>
    )
}