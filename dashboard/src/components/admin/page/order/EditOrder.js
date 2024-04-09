import React, {useState, useEffect} from "react";
import axios from "axios";
import env from '../../../../env';
import { useParams} from "react-router-dom";
import AuthUser from '../../../AuthUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const GetOder = () => {
  const { endpoint, endpointApi } = env();  
  const { authUser } = AuthUser();
  const idUser = authUser.id;
  const [order, setOrder] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(`${endpointApi}/admin/order/edit/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    getOrder();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${endpointApi}/admin/order/update/${id}`, {
      product_id: order.product_id,
      buyer_id: order.buyer_id,
      intermediary_id: idUser,
      note: order.note,
      });
      toast.success(response.data.success);
      navigate('/admin/transaction');
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  }

  return (
    <div>
        <div>
          <h2>Order Details</h2>
          <p>Note: {order.note}</p>
          <p>Status: {order.status}</p>
          <p>Product Name: {order.name_pd}</p>
          <p>Price: {order.price}</p>
          <img
          src={`${endpoint}/images/products/${order.image}`}
          alt={order.image}
          className="w-1rem shadow-2 border-round"
          style={{ width: '100px' }}
          />

          <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Transaction</button>
        </div>
    </div>
  );
}

export default GetOder;