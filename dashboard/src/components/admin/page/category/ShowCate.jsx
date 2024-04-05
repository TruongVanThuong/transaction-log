import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const endpoint = "http://localhost:8001/api/admin";

const ShowCate = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const response = await axios.get(`${endpoint}/category`);
    setCategories(response.data);
  };

  const deleteCategory = async (id) => {
    await axios.delete(`${endpoint}/category/delete/${id}`);
    getAllCategories();
};
  
  return (
    <div>
        <h1 className="py-4 text-xl font-semibold text-center">Category</h1>
        <div className="d-grid gap-2">
            <Link to="add" className="relative p-2 btn btn-dark w-25">
                <span>Add Category</span>
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
                                <th scope="col" class="px-6 py-3">Name Category</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map((category) => (
                                <tr key={category.id} className="bg-white border-b dark:bg-black dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{category.name_cate}</td>
                                    <td className="grid grid-cols-1 gap-1">
                                        <Link to={`edit/${category.id}`} className="col-start-1 mr-1">
                                            <sapn className="btn btn-primary">Edit</sapn>
                                        </Link>
                                        <button onClick={() => deleteCategory(category.id)} className="btn btn-danger">
                                            Delete
                                        </button>
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

export default ShowCate;