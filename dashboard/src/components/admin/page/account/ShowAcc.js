import React, {useState, useEffect} from "react";
import axios from "axios";
import env from '../../../../env';
import { Link } from "react-router-dom";

const GetAccount = () => {
  const { endpointApi } = env();
  const [accounts, setAccount] = useState([]);
  let count = 0;

  useEffect(() => {
    const dataAccount = async () => {
      try {
        const response = await axios.get(`${endpointApi}/admin/account`);
        setAccount(response.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };
    dataAccount();
  }, []);
  
  const deleteAccount = async (id) => {
    await axios.delete(`${endpointApi}/account/delete/${id}`);
    dataAccount();
  }
  return (
    <div>
        <h1 className="py-4 text-xl font-semibold text-center">Account</h1>
        <div className="d-grid gap-2">
            <Link to="add" className="relative p-2 btn btn-dark w-25">
                <span>Add Account</span>
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
                                <th scope="col" class="px-6 py-3">Name Account</th>
                                <th scope="col" class="px-6 py-3">Email</th>
                                <th scope="col" class="px-6 py-3">Phone</th>
                                <th scope="col" class="px-6 py-3">Address</th>
                                <th scope="col" class="px-6 py-3">Role</th>
                                <th scope="col" class="px-6 py-3">Wallet</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {accounts.map((account, key) => (
                              account.role !== 1 && (
                                <tr key={account.id} className="bg-white border-b dark:bg-black dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{++count}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{account.name}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{account.email}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{account.phone}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{account.address}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{account.name_role}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{account.wallet} </td>
                                    <td className="grid grid-cols-1 gap-1">
                                        <Link to={`edit/${account.id}`} className="col-start-1 mr-1">
                                            <sapn className="btn btn-primary">Edit</sapn>
                                        </Link>
                                        <button onClick={() => deleteAccount(account.id)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                              )
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

export default GetAccount;