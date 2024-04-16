import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import env from '../../../../env';


const EditRole = () => {
  const { endpointApi } = env();
  const navigate = useNavigate()
  const {id} = useParams()
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    role: '2',
    email: '',
    phone: '',
    address: '',
    password: '',
    again_password: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const GetRoleByID = async () => {
      try {
        const response = await axios.get(`${endpointApi}/admin/account/edit/${id}`);
        const userData = response.data; 
        setFormData({
          name: userData.name,
          role: userData.role,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    GetRoleByID()
  }, [id])

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${endpointApi}/admin/account/update/${id}`, formData);
      if (response.data.status) {
        toast.success(response.data.message);
        setFormData({
          name: '',
          role: '',
          email: '',
          phone: '',
          address: '',
        });
        navigate('/admin/account');

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
      } else {
            console.error('Server error:', error);
            alert('An error occurred. Please try again later.');
      }
    }
  }

  return(
    <div className="row justify-content-center pt-5">
      <div className="col-sm-12">
        <div className=" p-4">
          <h1 className="text-center mb-3">Edit account</h1>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
                {errors.name && <span className="text-danger">{errors.name}</span>}

            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
                {errors.email && <span className="text-danger">{errors.email}</span>}

            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
                {errors.phone && <span className="text-danger">{errors.phone}</span>}

            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
                {errors.address && <span className="text-danger">{errors.address}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                className="form-control"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="2">Người Trung Gian</option>
                <option value="3">Người Bán Hàng</option>
                <option value="4" selected>Khách Hàng</option>
              </select>
              {errors.role && <span className="text-danger">{errors.role}</span>}
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Edit account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditRole;

