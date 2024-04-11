import { useState, useEffect } from 'react';
import AuthUser from './AuthUser';
import env from '../env';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export default function Dashboard() {
  const { endpointApi } = env();
  const { getAuthUser } = AuthUser();
  const [userID, setUserDetail] = useState(null);
  const [user, setUser] = useState(null);
  const { authUser} = AuthUser();

  const [payment, setPayment] = useState('');
  const handleChange = (e) => {
    setPayment(e.target.value);
  };
  
  useEffect(() => {
    GetUser();
  }, []);
  
    const GetUser = async () => {
      if (authUser && authUser.id) {
        try {
          const response = await axios.get(`${endpointApi}/dashboard/edit/${authUser.id}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error getting user data:', error);
        }
      }
    };
  
  // Cả getUser và submitForm đều có thể sử dụng được
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (authUser && authUser.id) {
        const response = await axios.put(`${endpointApi}/dashboard/update/${authUser.id}`, {
          payment: payment
        });
        if (response.data && response.data.status) {
          toast.success(response.data.message);
          GetUser(); // Gọi lại GetUser để cập nhật dữ liệu sau khi cập nhật
        } else {
          toast.error('Error status');
        }
      } else {
        toast.error('User detail is not available');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className='container'>
      {user ? (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <h1 className='mb-4 mt-4'>Dashboard page</h1>
            <h4>Name</h4>
            <p>{user.name}</p>
            <h4>Email</h4>
            <p>{user.email}</p>
            <h4>Phone</h4>
            <p>{user.phone}</p>
            <h4>Address</h4>
            <p>{user.address}</p>
            <h4>Wallet</h4>
            <p>{user.wallet}</p>
          </div>
          <div>
            <h1 className='mb-4 mt-4'>Payment</h1>
            <div className="form-group">
              <label htmlFor="name">Payment:</label>
              <input
                  type="number"
                  className="form-control"
                  id="name"
                  value={payment}
                  onChange={handleChange}
                />
            </div>
            <button className='btn btn-primary mt-3 p-2'
             type="button" onClick={submitForm}
            >
              Add
            </button>
          </div>
        </div>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}