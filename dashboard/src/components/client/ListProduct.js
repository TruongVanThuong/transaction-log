import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthUser from '../AuthUser';
import env from '../../env';
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ShowShop = () => {
  const { endpoint, endpointApi } = env();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Số sản phẩm mỗi trang
  const { authUser } = AuthUser();

  useEffect(() => {
    getAllShops();
  }, []);

  const getAllShops = async () => {
    try {
      const response = await axios.get(`${endpointApi}/shop`);
      setShops(response.data.filter(shop => shop.status !== 0)); // Lọc các cửa hàng có status !== 0
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleBuyNow = (product) => {
    localStorage.setItem('checkoutProduct', JSON.stringify({
      productId: product.id,
      user: authUser.id,
    }));
    navigate('/checkout');
  };

  // Tính toán index bắt đầu và kết thúc của mảng sản phẩm hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shops.slice(indexOfFirstItem, indexOfLastItem);

  // Logic khi chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {currentItems.map((shop) => (
          <div key={shop.id} className="product-box" style={{ marginBottom: '20px' }}>
            <div className="image-box" >  
              <img src={`${endpoint}/images/products/${shop.image}`} alt={shop.image} className="w-1rem shadow-2 border-round" />
            </div>
            <h2 className="product-title">{shop.name_pd}</h2>
            <p className="product-description">{shop.desc}</p>
            <p className="product-price">{shop.price}</p>
            <button onClick={() => handleBuyNow(shop)} className="btn btn-primary">
              Buy now
            </button>
          </div>
        ))}
      </div>
      {/* Phân trang */}
      <ul className="pagination">
        {[...Array(Math.ceil(shops.length / itemsPerPage))].map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default ShowShop;
