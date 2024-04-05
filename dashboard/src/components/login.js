import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthUser from './AuthUser';

export default function Login() {

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    const { setAuthUser } = AuthUser();

    const submitForm = async (e) =>{
        e.preventDefault();
        let item = {email,password}
        try {
            const response = await fetch('http://localhost:8001/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (response.ok) {
                const data = await response.json();
                setAuthUser(data.user);
                console.log('Logged in user:', data.user);
                toast.success('Đăng nhập thành công!');   
            } else {
                console.error('Đã xảy ra lỗi:  else');
                toast.error('Đăng nhập thất bại! Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            toast.error('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
        }
        navigate('/');
    }

    return(
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                </div>
            </div>
        </div>
    )
}