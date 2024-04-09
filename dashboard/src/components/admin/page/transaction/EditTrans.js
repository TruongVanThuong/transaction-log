import React, {useState, useEffect} from "react";
import axios from "axios";
import env from '../../../../env';
import { useParams} from "react-router-dom";
import AuthUser from '../../../AuthUser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GetEditTrans = () => {
  const { endpoint, endpointApi } = env();
  const { authUser } = AuthUser();
  const idUser = authUser.id;
  const [transaction, setTrans] = useState({});
  const [Status, setStatus] = useState('Confirmed');
  const {id} = useParams();
console.log(transaction)
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await axios.get(`${endpointApi}/admin/transaction/edit/${id}`);
        setTrans(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    getTransaction();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${endpointApi}/admin/transaction/update/${id}`, {
        status: Status,
        intermediary_id: idUser,
      });
      toast.success('Cập nhật giao dịch thành công');
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  }

  return (
    <div class="order-details">
        <h2>Order Details</h2>
        <div class="order-info">
            <p><strong>Order ID:</strong> { transaction.id }</p>
            <p><strong>Product Name:</strong> { transaction.name_pd }</p>
            <p><strong>Product Price:</strong> { transaction.price }</p>
            <p><strong>Buyer:</strong> { transaction.buyer_name }</p>
            <p><strong>Seller:</strong> { transaction.seller_name }</p>
            <p><strong>Intermediary:</strong> { transaction.intermediary_name ? transaction.intermediary_name : '' }</p>
            <p><strong>Note:</strong> { transaction.note }</p>
            <p><strong>Status:</strong>
            {/* <button className="btn btn-warning"> { transaction.status }</button> */}
            <div className="mb-6 form-group">
              {/* <label htmlFor="category_id">category</label> */}
              <select value={Status} onChange={(e) => setStatus(e.target.value)} className='form-control' required>
                <option value={'Confirmed'}>Confirmed</option>
                <option value={'Shipped'}>Shipped</option>
                <option value={'Delivered'}>Delivered</option>
                <option value={'Completed'}>Completed</option>
              </select>
            </div>
            </p>
            <p><strong>Created At:</strong> { transaction.created_at }</p>
        </div>
        <div class="product-image">
          <img src={`${endpoint}/images/products/${transaction.image}`} alt={transaction.image} 
            className="w-1rem shadow-2 border-round" style={{ width: '100px' }} />
        </div>
        <button type="button" onClick={submitForm} className="btn btn-primary mt-4">
          Update
        </button>
    </div>
  );
}

export default GetEditTrans;