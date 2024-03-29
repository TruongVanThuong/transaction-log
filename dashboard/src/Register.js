import React, { useState } from 'react';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [wallet, setWallet] = useState("");


    async function signUp() {
        const item = { name, email, password, phone, address, role, wallet};
        console.log(item);
        const result = await fetch('http://localhost:8001/users', {
              method: 'get',
          });
          const data = await result.data;
          console.log('Result:', data);
        // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


            // const result = await fetch('http://localhost:8001/api/register', {
            //     method: 'post',
            //     body: JSON.stringify(item),
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //         'X-CSRF-TOKEN': csrfToken,                
            //       }
            // });
            // const data = await result.json();
            // console.log('Result:', data);
    }

    return (
        <div className="col-md-6 offset-sm-3">
            <h1>Register Page</h1>
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
            <input type='number' value={role} onChange={(e) => setRole(e.target.value)} className='form-control' placeholder='Role' />
            <br />
            <input type='number' value={wallet} onChange={(e) => setWallet(e.target.value)} className='form-control' placeholder='Wallet' />
            <br />
            <button onClick={signUp} className='btn btn-primary'>Sign Up</button>
        </div>
    );
}

export default Register;
