import React, {useState, useEffect} from "react";
import axios from "axios";
import env from '../../../../env';
import { Link } from "react-router-dom";

const GetTransaction = () => {
  const { endpoint, endpointApi } = env();
  const [transactions, setTrans] = useState([]);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await axios.get(`${endpointApi}/admin/transaction`);
        setTrans(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    getTransaction();
  }, []);


  return (
      <div>
        <h1 className="py-4 text-xl font-semibold text-center">order</h1>
        <div className="d-grid gap-2">
            <Link to="add" className="relative p-2 btn btn-dark w-25">
                <span>Add order</span>
            </Link>
        </div>
        <br/>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden"></div>
                    <div className="">
                        <table className="table table-bordered">
                            <thead className="">
                            <tr>
                                <th scope="col" class="px-6 py-3">ID</th>
                                <th scope="col" class="px-6 py-3">Name Product</th>
                                <th scope="col" class="px-6 py-3">Image Product</th>
                                <th scope="col" class="px-6 py-3">Price Product</th>
                                <th scope="col" class="px-6 py-3">Buyer ID</th>
                                <th scope="col" class="px-6 py-3">Seller ID</th>
                                <th scope="col" class="px-6 py-3">Intermediary ID</th>
                                <th scope="col" class="px-6 py-3">Note</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                                <th scope="col" class="px-6 py-3">Expiry date</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transactions.map((trans, index) => (
                                  <tr key={index} className="bg-white border-b dark:bg-black dark:border-gray-700">
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                      </td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trans.name_pd}</td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trans.price} vnd</td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img src={`${endpoint}/images/products/${trans.image}`} alt={trans.image} 
                                        className="w-1rem shadow-2 border-round" style={{ width: '100px' }} />
                                      </td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {trans.buyer_name}
                                      </td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trans.seller_name}</td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trans.intermediary_name}</td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trans.note}</td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trans.status}</td>
                                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{trans.created_at}</td>
                                      <td className="grid grid-cols-1 gap-1">
                                          <Link to={`edit/${trans.id}`} className="col-start-1 mr-1">
                                              <span className="btn btn-primary">Edit</span>
                                          </Link>
                                          {/* <button onClick={() => deleteorder(order.id)} className="btn btn-danger">
                                              Delete
                                          </button> */}
                                      </td>
                                  </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default GetTransaction;