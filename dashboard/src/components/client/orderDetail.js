import { useEffect, useState } from 'react';
import axios from "axios";
import env from '../../env';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../AuthUser';


export default function OrderDetail() {
  const { authUser } = AuthUser();
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const { endpoint, endpointApi } = env();
  const [shop, setShop] = useState({});
  const [id_product, setIDProduct] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem('checkoutProduct'));
    setCheckoutProduct(product);
    if (product) {
      getAllShops(product.productId);
      setIDProduct(product.productId);
    }
  }, []);

  const getAllShops = async (productId) => {
    try {
      const response = await axios.get(`${endpointApi}/shop/checkout/${productId}`);
      setShop(response.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  }

  const CheckOutSM = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${endpointApi}/order-detail`, {
          id_user: authUser.id,
          id_product: id_product,
          note: note,
      });
      if (response.data.status) {
          toast.success(response.data.message);
          localStorage.removeItem('checkoutProduct');
          navigate('./log');
      } else if (response.data.error) {
          toast.error(response.data.error);
      }
    } catch (error) {
        console.error("Error checking out:", error);
        toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  }

  return (
    <div>
      <h1>Checkout</h1>
      {checkoutProduct && (
        <div>
          <p>user: {authUser.name}</p>
          <p>Product Price: {checkoutProduct.productId}</p>
        </div>
      )}
      {shop && (
        <div className="product-box">
          <img src={`${endpoint}/images/products/${shop.image}`} alt={shop.image} 
            className="w-1rem shadow-2 border-round" style={{ width: '100px' }} />
          <h2 className="product-title">{shop.name_pd}</h2>
          <p className="product-description">{shop.desc}</p>
          <p className="product-price">{shop.price}</p>
          <div className='form-control'>
            <label>Note</label>
            <input type='tex' value={note} onChange={(e) => setNote(e.target.value)}/>
          </div>
        </div>
      )}
      <button onClick={CheckOutSM} className='btn btn-primary'>Order</button>
      <ToastContainer />
    </div>
  );
}
