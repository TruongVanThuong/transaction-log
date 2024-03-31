import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString !== null && tokenString !== 'undefined') {
          try {
            const userToken = JSON.parse(tokenString);
            return userToken;
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }
        } else {
          console.error("Token not found or undefined in sessionStorage");
          return null;
        }
      }


      const getUser = () => {
        const userString = sessionStorage.getItem('user');
        if (userString !== null && userString !== 'undefined') {
          try {
            const user_detail = JSON.parse(userString);
            return user_detail;
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }
        } else {
          console.error("User not found or undefined in sessionStorage");
          return null;
        }
      }


    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const http = axios.create({
        baseURL:"http://localhost:8001/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}