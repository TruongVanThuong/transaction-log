import React, { useEffect, useState } from 'react';
import axios from "axios";
import env from '../../env';
import AuthUser from '../AuthUser';

const GetLog = () => {
  const { authUser } = AuthUser();
  const { endpoint, endpointApi } = env();
  const [logs, setLog] = useState([]);
  const idUser = authUser.id;

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(`${endpointApi}/order/${idUser}`);
        setLog(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    getOrder();
  }, [idUser]);

  console.log(logs.product);

  return (
    <div>
      <h2>Lịch sử đơn hàng</h2>
      {logs.map((log, index) => (
        <div key={index} className="order-log" 
        style={{ border: '1px solid #ccc', padding: '10px',  marginBottom: '20px' }}>
          <h3>Đơn hàng</h3>
          <p>Ghi chú: {log.note}</p>
          <p>Trạng thái: {log.status}</p>
          <div className="product-details" style={{ display: 'flex', alignItems:'center', justifyContent:'space-between' }}>
            <h4>Sản phẩm</h4>
            {log.product && (
              <>
                <p>Tên sản phẩm: {log.product.name_pd}</p>
                <p>Giá: {log.product.price}</p>
                <img
                  src={`${endpoint}/images/products/${log.product.image}`}
                  alt={log.product.image}
                  className="product-image"
                  style={{ width: '100px' }}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetLog;