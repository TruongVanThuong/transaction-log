import React from 'react';
import AuthUser from '../components/AuthUser';
import { Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';
import Shop from '../components/client/ListProduct'
import Checkout from '../components/client/checkout'
import Log from '../components/client/log'
import ProposalOrder from '../components/client/proposalOrder'
import Dashboard from '../components/dashboard';
import OrderDetail from '../components/client/orderDetail';
import Product from '../components/admin/page/product/Showproducts'
import AddProduct from '../components/admin/page/product/CreateProduct'
import EditProduct from '../components/admin/page/product/EditProduct'
import Category from '../components/admin/page/category/ShowCate'
import AddCategory from '../components/admin/page/category/CreateCate'
import EditCategory from '../components/admin/page/category/EditCate'
import Role from '../components/admin/page/role/ShowRole'
import AddRole from '../components/admin/page/role/CreateRole'
import EditRole from '../components/admin/page/role/EditRole'
import Transaction from '../components/admin/page/transaction/transaction'
import EditTrans from '../components/admin/page/transaction/EditTrans'
import Order from '../components/admin/page/order/order'
import EditOrder from '../components/admin/page/order/EditOrder'
import Account from '../components/admin/page/account/ShowAcc'
import EditAccount from '../components/admin/page/account/EditAcc'
import AddAccount from '../components/admin/page/account/CreateAcc'

const ClientLayout = () => {

    const { authUser, logout, getAuthUser } = AuthUser();
    console.log(authUser)
    const logoutUser = () => {
        if (authUser) {
            logout();
        }
    };
    const navItems = {
        1: [
            { path: "/admin/product", label: "Product" },
            { path: "/admin/category", label: "Category" },
            { path: "/admin/role", label: "Role" },
            { path: "/admin/transaction", label: "Transaction" },
            { path: "/admin/account", label: "Account" },
            { path: "/admin/order", label: "Order" },
        ],
        2: [
            { path: "/admin/product", label: "Product" },
            { path: "/admin/category", label: "Category" },
            { path: "/admin/transaction", label: "Transaction" },
            { path: "/admin/order", label: "Order" },
        ],
        3: [
            { path: "/admin/product", label: "Product" },
        ],   
    };

    return (
      <> 
        <div className="header-wrapper">
            <header>
                <div className='topbar d-flex align-items-center'>
                    <nav className="navbar navbar-expand">
                        <div className="topbar-logo-header">
                            <div className="">
                                <img src={"../assets_admin/images/logo-icon.png"} className="logo-icon" alt="logo icon"/>
                            </div>
                            <div className="">
                                <h4 className="logo-text">ADMIN</h4>
                            </div>
                        </div>
                        <div className="mobile-toggle-menu"><i className="bx bx-menu"></i></div>
                        <div className="search-bar flex-grow-1">
                            <div className="position-relative search-bar-box">
                                <input type="text" className="form-control search-control" placeholder="Type to search..."/> 
                                <span className="position-absolute top-50 search-show translate-middle-y"><i className="bx bx-search"></i></span>
                                <span className="position-absolute top-50 search-close translate-middle-y"><i className="bx bx-x"></i></span>
                            </div>
                        </div>
                        <div className="top-menu ms-auto">
                            <ul className="navbar-nav align-items-center">
                                <li className="nav-item mobile-search-icon">
                                    <a className="nav-link" href="#"> <i className="bx bx-search"></i>
                                    </a>
                                </li>
                                <li className="nav-item dropdown dropdown-large">
                                    <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <i className="bx bx-category"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <div className="row row-cols-3 g-3 p-3">
                                            <div className="col text-center">
                                                <div className="app-box mx-auto bg-gradient-cosmic text-white"><i className="bx bx-group"></i>
                                                </div>
                                                <div className="app-title">Teams</div>
                                            </div>
                                            <div className="col text-center">
                                                <div className="app-box mx-auto bg-gradient-burning text-white"><i className="bx bx-atom"></i>
                                                </div>
                                                <div className="app-title">Projects</div>
                                            </div>
                                            <div className="col text-center">
                                                <div className="app-box mx-auto bg-gradient-lush text-white"><i className="bx bx-shield"></i>
                                                </div>
                                                <div className="app-title">Tasks</div>
                                            </div>
                                            <div className="col text-center">
                                                <div className="app-box mx-auto bg-gradient-kyoto text-dark"><i className="bx bx-notification"></i>
                                                </div>
                                                <div className="app-title">Feeds</div>
                                            </div>
                                            <div className="col text-center">
                                                <div className="app-box mx-auto bg-gradient-blues text-dark"><i className="bx bx-file"></i>
                                                </div>
                                                <div className="app-title">Files</div>
                                            </div>
                                            <div className="col text-center">
                                                <div className="app-box mx-auto bg-gradient-moonlit text-white"><i className="bx bx-filter-alt"></i>
                                                </div>
                                                <div className="app-title">Alerts</div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown dropdown-large">
                                    <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <span className="alert-count">7</span>
                                        <i className="bx bx-bell"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a href="javascript:;">
                                            <div className="msg-header">
                                                <p className="msg-header-title">Notifications</p>
                                                <p className="msg-header-clear ms-auto">Marks all as read</p>
                                            </div>
                                        </a>
                                        <div className="header-notifications-list ps">
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-primary text-primary"><i className="bx bx-group"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">New Customers<span className="msg-time float-end">14 Sec
                                                                ago</span></h6>
                                                        <p className="msg-info">5 new user registered</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-danger text-danger"><i className="bx bx-cart-alt"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">New Orders <span className="msg-time float-end">2 min
                                                                ago</span></h6>
                                                        <p className="msg-info">You have recived new orders</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-success text-success"><i className="bx bx-file"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">24 PDF File<span className="msg-time float-end">19 min
                                                                ago</span></h6>
                                                        <p className="msg-info">The pdf files generated</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-warning text-warning"><i className="bx bx-send"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Time Response <span className="msg-time float-end">28 min
                                                                ago</span></h6>
                                                        <p className="msg-info">5.1 min avarage time response</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-info text-info"><i className="bx bx-home-circle"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">New Product Approved <span className="msg-time float-end">2 hrs ago</span></h6>
                                                        <p className="msg-info">Your new product has approved</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-danger text-danger"><i className="bx bx-message-detail"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">New Comments <span className="msg-time float-end">4 hrs
                                                                ago</span></h6>
                                                        <p className="msg-info">New customer comments recived</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-success text-success"><i className="bx bx-check-square"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Your item is shipped <span className="msg-time float-end">5 hrs
                                                                ago</span></h6>
                                                        <p className="msg-info">Successfully shipped your item</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-primary text-primary"><i className="bx bx-user-pin"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">New 24 authors<span className="msg-time float-end">1 day
                                                                ago</span></h6>
                                                        <p className="msg-info">24 new authors joined last week</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="notify bg-light-warning text-warning"><i className="bx bx-door-open"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Defense Alerts <span className="msg-time float-end">2 weeks
                                                                ago</span></h6>
                                                        <p className="msg-info">45% less alerts last 4 weeks</p>
                                                    </div>
                                                </div>
                                            </a>
                                            {/* <div className="ps__rail-x" style="left: 0px; bottom: 0px;">
                                                <div className="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                            </div>
                                            <div className="ps__rail-y" style="top: 0px; right: 0px;">
                                                <div className="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                            </div>
                                        <div className="ps__rail-x" style="left: 0px; bottom: 0px;"><div className="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div className="ps__rail-y" style="top: 0px; right: 0px;"><div className="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div></div> */}
                                        </div>
                                        <a href="javascript:;">
                                            <div className="text-center msg-footer">View All Notifications</div>
                                        </a>
                                    </div>
                                </li>
                                <li className="nav-item dropdown dropdown-large">
                                    <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> <span className="alert-count">8</span>
                                        <i className="bx bx-comment"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a href="javascript:;">
                                            <div className="msg-header">
                                                <p className="msg-header-title">Messages</p>
                                                <p className="msg-header-clear ms-auto">Marks all as read</p>
                                            </div>
                                        </a>
                                        <div className="header-message-list ps">
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-1.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Daisy Anderson <span className="msg-time float-end">5 sec
                                                                ago</span></h6>
                                                        <p className="msg-info">The standard chunk of lorem</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-2.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Althea Cabardo <span className="msg-time float-end">14
                                                                sec ago</span></h6>
                                                        <p className="msg-info">Many desktop publishing packages</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-3.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Oscar Garner <span className="msg-time float-end">8 min
                                                                ago</span></h6>
                                                        <p className="msg-info">Various versions have evolved over</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-4.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Katherine Pechon <span className="msg-time float-end">15
                                                                min ago</span></h6>
                                                        <p className="msg-info">Making this the first true generator</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-5.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Amelia Doe <span className="msg-time float-end">22 min
                                                                ago</span></h6>
                                                        <p className="msg-info">Duis aute irure dolor in reprehenderit</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-6.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Cristina Jhons <span className="msg-time float-end">2 hrs
                                                                ago</span></h6>
                                                        <p className="msg-info">The passage is attributed to an unknown</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-7.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">James Caviness <span className="msg-time float-end">4 hrs
                                                                ago</span></h6>
                                                        <p className="msg-info">The point of using Lorem</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-8.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Peter Costanzo <span className="msg-time float-end">6 hrs
                                                                ago</span></h6>
                                                        <p className="msg-info">It was popularised in the 1960s</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-9.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">David Buckley <span className="msg-time float-end">2 hrs
                                                                ago</span></h6>
                                                        <p className="msg-info">Various versions have evolved over</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-10.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Thomas Wheeler <span className="msg-time float-end">2 days
                                                                ago</span></h6>
                                                        <p className="msg-info">If you are going to use a passage</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a className="dropdown-item" href="javascript:;">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-online">
                                                        {/* <img src="assets/images/avatars/avatar-11.png" className="msg-avatar" alt="user avatar"> */}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h6 className="msg-name">Johnny Seitz <span className="msg-time float-end">5 days
                                                                ago</span></h6>
                                                        <p className="msg-info">All the Lorem Ipsum generators</p>
                                                    </div>
                                                </div>
                                            </a>
                                            {/* <div className="ps__rail-x" style="left: 0px; bottom: 0px;">
                                                <div className="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                            </div>
                                            <div className="ps__rail-y" style="top: 0px; right: 0px;">
                                                <div className="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                            </div>
                                        <div className="ps__rail-x" style="left: 0px; bottom: 0px;"><div className="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div className="ps__rail-y" style="top: 0px; right: 0px;"><div className="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div></div> */}
                                        </div>
                                        <a href="javascript:;">
                                            <div className="text-center msg-footer">View All Messages</div>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="user-box dropdown" >
                            <a className="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                
                                <i className="bx bx-user user-img" ></i>
                                <div className="user-info ps-3">
                                    <p className="user-name mb-0"></p>
                                    <p className="designattion mb-0"></p>
                                </div>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                            {getAuthUser() ? (
                            <>
                                <li>
                                    <Link className="dropdown-item" to="/"><i className="bx bx-home-circle"></i>Home</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/dashboard"><i className="bx bx-user"></i>Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <span role="button" className="dropdown-item" onClick={logoutUser}><i className="bx bx-log-out-circle"></i>Logout</span>
                                </li>
                            </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="dropdown-item" to="/login"><i className="bx bx-user"></i>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="dropdown-item" to="/register"><i className="bx bx-user"></i>Register</Link>
                                    </li>
                                </>
                            )}
                            </ul>
                        </div>

                    </nav>
                </div>
            </header>
            <div className="nav-container primary-menu">
                <div className="mobile-topbar-header">
                    <div>
                        <img src="../assets_admin/images/logo-icon.png" className="logo-icon" alt="logo icon"/>
                    </div>
                    <div>
                        <h4 className="logo-text">Rukada</h4>
                    </div>
                    <div className="toggle-icon ms-auto"><i className="bx bx-arrow-to-left"></i>
                    </div>
                </div>
                <nav className="navbar navbar-expand-xl w-100">
                    <ul className="navbar-nav justify-content-start flex-grow-1 gap-1">

            {/* =====  client  ===== */}
                        <li className="nav-item">
                            <Link className="nav-link font-weight-bold" to="/">
                                {/* <div className="parent-icon"><i className="bx bx-user"></i></div> */}
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shop">
                                {/* <div className="parent-icon"><i className="bx bx-user"></i></div> */}
                                Shop
                            </Link>
                        </li>
                        {getAuthUser() &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/log">
                                {/* <div className="parent-icon"><i className="bx bx-user"></i></div> */}
                                Log
                            </Link>
                        </li>
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to="/proposal-order">
                                {/* <div className="parent-icon"><i className="bx bx-user"></i></div> */}
                                Proposal Order
                            </Link>
                        </li>
                        
            {/* =====  ADMIN  ===== */}
                        {getAuthUser() && authUser &&
                            (navItems[authUser.role] && navItems[authUser.role].map((item, index) => (
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link" to={item.path}>
                                        {item.label}
                                    </Link>
                                </li>
                            )))
                        }
                    </ul>
                    
                </nav>
            </div>
        </div>
        <div className='page-wrapper'>
            <div className='page-content'>
                <Routes>
                    {/* client */}

                    <Route path="/shop" element={<Shop />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/log" element={<Log />} />
                    <Route path="/proposal-order" element={<ProposalOrder />} />
                    <Route path="/order-detail" element={<OrderDetail />} />

                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                        
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* admin */}
                    {/* product */}
                    <Route path="/admin/product" element={<Product />} />
                    <Route path="/admin/product/add" element={<AddProduct />} />
                    <Route path="/admin/product/edit/:id" element={<EditProduct />} />
                    {/* Category */}
                    <Route path="/admin/category" element={<Category />} />
                    <Route path="/admin/category/add" element={<AddCategory />} />
                    <Route path="/admin/category/edit/:id" element={<EditCategory />} />
                    {/* role */}
                    <Route path="/admin/role" element={<Role />} />
                    <Route path="/admin/role/add" element={<AddRole />} />
                    <Route path="/admin/role/edit/:id" element={<EditRole />} />
                    {/* Transaction */}
                    <Route path="/admin/transaction" element={<Transaction />} />
                    <Route path="/admin/transaction/edit/:id" element={<EditTrans />} />
                    {/* Order */}
                    <Route path="/admin/order" element={<Order />} />
                    <Route path="/admin/order/edit/:id" element={<EditOrder />} />
                    {/* Account */}
                    <Route path="/admin/account" element={<Account />} />
                    <Route path="/admin/account/add" element={<AddAccount />} />
                    <Route path="/admin/account/edit/:id" element={<EditAccount />} />
                </Routes>
            </div>               
        </div>
        <div className="overlay toggle-icon"></div>
        <footer className="page-footer">
            <p className="mb-0">Copyright © 2024. All right reserved.</p>
        </footer>
      </>
    );
}

export default ClientLayout;