import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const endpoint = "http://localhost:8001/api/admin/product";
const EditProduct = () => {
    const [desc, setDesc] = useState('')
    const [name_pd, setName] = useState('')
    const [image, setImage] = useState(null)
    const [category_id, setCategory_id] = useState('')
    const [price, setPrice] = useState('')
    const [expiration_date, setExpirationDate] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()
    const [categories, setCategories] = useState([]);

    const getAllCategories = async () => {
        const response = await axios.get(`http://localhost:8001/api/admin/category`);
        setCategories(response.data);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const update = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('image', image);
        formData.append('desc', desc);
        formData.append('name_pd', name_pd);
        formData.append('category_id', category_id);
        formData.append('price', price);
        formData.append('expiration_date', expiration_date);

        console.log(formData.get('image'));
        await axios.post(`${endpoint}/update/${id}` , 
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        },
        // {
        //     desc: desc, 
        //     price: price, 
        //     name_pd: name_pd,
        //     category_id: category_id,
        //     image: image,
        //     expiration_date: expiration_date,
        // }
        );
        navigate('/admin/product')
    }
    useEffect(() => {
        const getProductById = async () => {
            const response = await axios.get(`${endpoint}/edit/${id}`)
            setDesc(response.data.desc)
            setPrice(response.data.price)
            setName(response.data.name_pd)
            setCategory_id(response.data.category_id)
            setExpirationDate(response.data.expiration_date)
        }
        getProductById()
        getAllCategories();
    }, [id])
    return (
        <div>
            <h1 className="text-lg mb-6 mt-6">Edit Product</h1>
            <form onSubmit={update} className="mx-auto">
                <div className="form-group">
                    <label htmlFor="desc"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Desc</label>
                    <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text"
                           id="desc" className="form-control" required/>
                </div>
                <div className="mb-6 form-group">
                    <label htmlFor="name_pd"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                    <input value={name_pd} onChange={(e) => setName(e.target.value)} type="text"
                           id="name_pd" className="form-control" required/>
                </div>
                <div className="mb-6 form-group">
                    <label htmlFor="image"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
                    <input onChange={handleFileChange} type="file"
                           id="image" className="form-control" />
                </div>
                    <div className="mb-6 form-group">
                        <label htmlFor="category_id"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">category</label>
                        <select value={category_id} onChange={(e) => setCategory_id(e.target.value)} className='form-control'>
                            {categories.map((cate) => (
                                <option value={cate.id}>{cate.name_cate}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6 form-group">
                        <label htmlFor="price"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" id="price"
                               className="form-control" required/>
                    </div>
                    <div className="col-start-4 col-end-7 form-group">
                        <label htmlFor="expiration_date"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration date</label>
                        <input value={expiration_date} onChange={(e) => setExpirationDate(e.target.value)} 
                         type="datetime-local" id="expiration_date" className="form-control" />
                    </div>

                <br/>
                <button type="submit" className="btn btn-primary">
                    <span className="relative">Update</span>
                </button>
            </form>
        </div>
    );

}


export default EditProduct;
