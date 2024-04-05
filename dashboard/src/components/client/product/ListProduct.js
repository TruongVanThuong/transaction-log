import React, {useEffect, useState} from "react";
import axios from "axios";

const endpoint = "http://localhost:8001/api";

const ShowShop = () => {
  const [shops, setShop] = useState([]);

  useEffect(() => {
    getAllShops();
    // console.log("load");
  })

  const getAllShops = async () => {
    const response = await axios.get(`${endpoint}/shop`);
    setShop(response.data);
    // console.log(response.data);
  }

  return (
    <>
    {shops.map((cate) => (
      <div class="product-box">
        <img src={`http://localhost:8001/images/products/${shops.image}`} alt={shops.image} 
        className="w-1rem shadow-2 border-round" style={{width:'100px'}} />;
        <h2 class="product-title">Tên Sản Phẩm</h2>
        <p class="product-description">Mô tả sản phẩm sẽ ở đây.</p>
        <p class="product-price">$100.00</p>
        <button class="btn-add-to-cart">Thêm vào giỏ hàng</button>
      </div>
    ))}
    </>
  )
}

export default ShowShop;