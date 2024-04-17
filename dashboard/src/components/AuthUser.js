import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AuthUser(){
  const navigate = useNavigate();

  const getAuthUser = () => {
    const authUserString = localStorage.getItem('authUser');
    const authUser = JSON.parse(authUserString);
    return authUser;
  };

  const [authUser, setAuthUser] = useState(getAuthUser());

  const saveAuthUser = (user) => {
    localStorage.setItem('authUser', JSON.stringify(user));
    setAuthUser(user);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setAuthUser(null);
    toast.success('Đăng xuat thành công!'); 
    navigate('/login');
  };

  const http = axios.create({
    baseURL: 'http://localhost:8001/api',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${authUser?.token}`, // Use the token from the authUser object
    },
  });

  return { setAuthUser: saveAuthUser, authUser, getAuthUser, http, logout };
}