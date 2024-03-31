import { register } from "./api/connect";
import React, { useState } from 'react';
// import axios from 'axios';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [wallet, setWallet] = useState("");


    async function getCsrfToken() {
        // Implement the logic to fetch the CSRF token from the server
        // For example, you could make an HTTP request to a specific endpoint
        // that returns the CSRF token.
        const response = await fetch('http://localhost:8001/api/csrf-token');
        const data = await response.json();
        return data;
        // console.log(response.token);
      }

    async function signUp() {
        const item = { name, email, password, phone, address, role, wallet };
        const response = await register(item);
        const csrfToken = await getCsrfToken(); // Function to get the CSRF token from the server
        console.log('Result:', csrfToken.token);
        // const result = await axios.post('http://localhost:8001/api/register', item
        // , {
        //   headers: {
        //     'X-CSRF-TOKEN': csrfToken.token, // Include the CSRF token in the headers
        //   },
        // }
        // );
        // const data = await result.data;
        console.log(response);
        // console.log('Result:', data);

        console.log(item);
        // const result = await fetch('http://localhost:8001/users', {
        //       method: 'get',
        //   });
        //   const data = await result.json();
        //   console.log('Result:', data);
        // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        //   console.log('Result:', csrfToken);


        //     const result = await axios.post('http://localhost:8001/api/register', {
        //         method: 'post',
        //         body: JSON.stringify(item),
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             // 'X-CSRF-TOKEN': csrfToken,                
        //           }
        //     });
        //     const data = await result.json();
        //     console.log('Result:', data);
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
