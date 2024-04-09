// AdminLayout.js

import React from 'react';
// import IndexAdmin from '../components/admin/indexAdmin';
import { Routes, Route, Link } from 'react-router-dom';
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
import AuthUser from '../components/AuthUser';


const AdminLayout = () => {

  const { authUser, logout, getAuthUser } = AuthUser();

  const logoutUser = () => {
      if (authUser) {
          logout();
      }
  };

    return (
      <>
        <div className="admin-layout">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/product">Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/category">Category</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/role">Role</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/transaction">Transaction</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/order">Order</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    {!getAuthUser() &&
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    }
                    <li className="nav-item">
                        <span role="button" className="nav-link" onClick={logoutUser}>Logout</span>
                    </li>
                </ul>
            </nav>
        </div>
        <Routes>
          {/* product */}
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          {/* Category */}
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/edit/:id" element={<EditCategory />} />
          {/* role */}
          <Route path="/role" element={<Role />} />
          <Route path="/role/add" element={<AddRole />} />
          <Route path="/role/edit/:id" element={<EditRole />} />
          {/* Transaction */}
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction/edit/:id" element={<EditTrans />} />

          {/* Transaction */}
          <Route path="/order" element={<Order />} />
          <Route path="/order/edit/:id" element={<EditOrder />} />
        </Routes>
      </>
    );
}

export default AdminLayout;
