import React from 'react';
import AuthUser from '../components/AuthUser';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import Shop from '../components/client/product/ListProduct'
import Checkout from '../components/client/checkout/checkout'
import Log from '../components/client/log/log'
import Dashboard from '../components/dashboard';

const ClientLayout = () => {

    const { authUser, logout, getAuthUser } = AuthUser();

    const logoutUser = () => {
        if (authUser) {
            logout();
        }
    };


    return (
      <>
        <div className="client-layout">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/shop">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/log">Log</Link>
                    </li>
                    {getAuthUser() ? (
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
                    </li>
                </ul>
            </nav>
        </div>
        <Routes>
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/log" element={<Log />} />

            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
                
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </>
    );
}

export default ClientLayout;