import { useEffect, useState } from 'react';
import axios from "axios";
import env from '../../env';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Checkout() {
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const { endpoint, endpointApi } = env();
  const [shop, setShop] = useState({});
  const [id_user, setIDUser] = useState('');
  const [id_product, setIDProduct] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem('checkoutProduct'));
    setCheckoutProduct(product);
    if (product) {
      getAllShops(product.productId);
      setIDUser(product.user);
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
      const response = await axios.post(`${endpointApi}/shop/checkout`, {
          id_user: id_user,
          id_product: id_product,
      });
      if (response.data.success) {
          toast.success(response.data.success);
          localStorage.removeItem('checkoutProduct');
          navigate('/log');
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
          <p>user: {checkoutProduct.user}</p>
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
        </div>
      )}
      <button onClick={CheckOutSM} className='btn btn-primary'>Pay</button>
      <ToastContainer />
    </div>
  );
}
