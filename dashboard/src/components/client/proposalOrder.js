
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthUser from '../AuthUser';
import env from '../../env';
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ProposalOrder = () => {
  const { endpoint, endpointApi } = env();
  const navigate = useNavigate();
  const [shops, setShop] = useState([]);
  const { authUser } = AuthUser();

  useEffect(() => {
    getAllShops();
  }, []);

  const getAllShops = async () => {
    try {
      const response = await axios.get(`${endpointApi}/shop`);
      setShop(response.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleOrder = (product) => {
    localStorage.setItem('checkoutProduct', JSON.stringify({
      productId: product.id,
      user: authUser.id,
    }));
    navigate('/order-detail');
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {shops.map((shop) => (
        shop.status == 0 && (
          <>
            <div key={shop.id} className="product-box" style={{ width: '23%', marginBottom: '20px', position:'relative' }}>
              <div style={{marginTop:'30px'}}>  
                {/* <img src={`${endpoint}/images/products/${shop.image}`} alt={shop.image} className="w-1rem shadow-2 border-round" style={{ width: '100px' }} /> */}
                <h2 className="product-title">{shop.name_pd}</h2>
                <p className="product-description">{shop.desc}</p>
                <p className="product-price">{shop.price} vnd</p>
                <button onClick={() => handleOrder(shop)} className="btn btn-primary">
                  Order
                </button>
              </div>
              <div style={{
                position: 'absolute', 
                top:'5px', 
                left:'5px', 
                padding: '5px',
                background: '#ebec00',
                borderRadius: '10px'
                }}>
                out of stock
              </div>
            </div>
          </>
        )
      ))}

    </div>
  );
}

export default ProposalOrder;
