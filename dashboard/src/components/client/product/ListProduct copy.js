import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthUser from '../../AuthUser';
import env from '../../../env';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap'; // Import modal components from react-bootstrap
import "./styles.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShowShop = () => {
  const { endpoint, endpointApi } = env();
  const navigate = useNavigate();
  const [shops, setShop] = useState([]);
  const { authUser } = AuthUser();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  console.log(selectedProduct);
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

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true); // Show modal when clicking "Buy Now"
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false); // Close modal
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const addToCart = async () => {
    if (!selectedProduct) return;
    if (quantity > selectedProduct.qly) {
      toast.warning(`Số lượng vượt quá số lượng trong kho. gioi han la: ${selectedProduct.qly}`);
      return;
    }
    localStorage.setItem('checkoutProduct', JSON.stringify({
      productId: selectedProduct.id,
      user: authUser.id,
      qty: quantity,
    }));
    navigate('/checkout');
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {shops.map((shop) => (
        <div key={shop.id} className="product-box" style={{ width: '23%', marginBottom: '20px' }}>
          <img src={`${endpoint}/images/products/${shop.image}`} alt={shop.image} className="w-1rem shadow-2 border-round" style={{ width: '100px' }} />
          <h2 className="product-title">{shop.name_pd}</h2>
          <p className="product-description">{shop.desc}</p>
          <p className="product-price">{shop.price}</p>
          <button onClick={() => handleBuyNow(shop)} className="btn-add-to-cart">
            Xem
          </button>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}> {/* Modal component from react-bootstrap */}
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct && selectedProduct.name_pd}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedProduct && (
          <>
            <img src={`${endpoint}/images/products/${selectedProduct.image}`} alt={selectedProduct.image} className="w-1rem shadow-2 border-round" style={{ width: '100px' }} />
            <p>{selectedProduct.desc}</p>
            <p>Giá: {selectedProduct.price}</p>
            <div>
              <label>Số lượng:</label>
              <input type="number" value={quantity} onChange={handleQuantityChange} min={1} />
            </div>
          </>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={addToCart}>
            Mua ngay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShowShop;
