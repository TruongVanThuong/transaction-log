import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/adminLayout';
import ClientLayout from './layouts/clientLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <Routes>
                <Route path="/admin/*" element={<AdminLayout />} />
                <Route path="/*" element={<ClientLayout />} />
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
