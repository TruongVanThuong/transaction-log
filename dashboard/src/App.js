import { Routes, Route, Link } from 'react-router-dom';
import AuthUser from './components/AuthUser';
import Guest from './navbar/guest';
import Auth from './navbar/auth';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Product from './components/admin/page/product/Showproducts'
import AddProduct from './components/admin/page/product/CreateProduct'
import EditProduct from './components/admin/page/product/EditProduct'
import Category from './components/admin/page/category/ShowCate'
import AddCategory from './components/admin/page/category/CreateCate'
import EditCategory from './components/admin/page/category/EditCate'
import Role from './components/admin/page/role/ShowRole'
import AddRole from './components/admin/page/role/CreateRole'
import EditRole from './components/admin/page/role/EditRole'
import Account from './components/admin/page/account/ShowAcc'
import AddAcc from './components/admin/page/account/CreateAcc'
import EditAcc from './components/admin/page/account/EditAcc'

import Shop from './components/client/product/ListProduct'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
    const { getAuthUser } = AuthUser();

    // console.log(getAuthUser);

  return (
    <>
        {getAuthUser() ? (
            <Auth />
        ) : (
            <Guest />
        )}
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
                    <Link className="nav-link" to="/shop">Shop</Link>
                </li>
            </ul>

        </nav>
        <div className="container">
            <Routes>
                <Route path="/shop" element={<Shop />} />
                
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
                {/* account */}
                <Route path="/admin/account" element={<Account />} />
                <Route path="/admin/account/add" element={<AddAcc />} />
                <Route path="/admin/account/edit/:id" element={<EditAcc />} />
                
            </Routes>
            <ToastContainer />
        </div>
     </>
);
}

export default App;
