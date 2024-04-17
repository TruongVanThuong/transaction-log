import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthUser from './AuthUser';
import Axios from "axios";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const { setAuthUser } = AuthUser();

    const submitForm = async (e) => {
        e.preventDefault();
        const item = { email, password };
        
        try {
            const response = await Axios.post('http://localhost:8001/api/login', item);
            document.cookie = `laravel_session=${response.data.token}`;
            console.log( document.cookie);
            if (response.status === 200) {
                const data = response.data;
                setAuthUser(data.user);
                // setTimeout(() => {
                //     window.location.reload(navigate('/'));  
                // }, 50);                
                toast.success('Đăng nhập thành công!'); 
            } else {
                console.error('Đã xảy ra lỗi:', response);
                toast.error('Đăng nhập thất bại! Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
            toast.error('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
        }
    }

    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
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
