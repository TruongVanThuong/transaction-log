import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import {useNavigate} from 'react-router-dom'
import AuthUser from '../../../AuthUser';
import env from '../../../../env';

const { endpointAdmin } = env();
// const endpoint = 'http://localhost:8001/api/admin/product'

const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const { authUser } = AuthUser();
    const idUser = authUser.id;

    useEffect(() => {
        getAllCategories();
    }, []);
    
    const getAllCategories = async () => {
        const response = await axios.get(`${endpointAdmin}/category`);
        setCategories(response.data);
    };

    const [desc, setDesc] = useState('')
    const [name_pd, setName] = useState('')
    const [image, setImage] = useState(null)
    const [category_id, setCategory_id] = useState('')
    const [price, setPrice] = useState('')
    const [expiration_date, setExpirationDate] = useState('')

    console.log({
        desc: desc, 
        price: price, 
        name_pd: name_pd,
        image: image,
        category_id: category_id,
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    const store = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('desc', desc);
        formData.append('name_pd', name_pd);
        formData.append('image', image);
        formData.append('category_id', category_id);
        formData.append('price', price);
        formData.append('expiration_date', expiration_date);
        formData.append('seller_id', idUser);

        try {
            await axios.post(`${endpointAdmin}/product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Thêm sản phẩm thành công');
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
        }
    }
    return (
        <div className="row justify-content-center pt-5">
            <div className="col-sm-12">
                <div className=" p-4">
                    <h1 className="text-lg mb-6 mt-6 text-center">Add Product</h1>
                    <form onSubmit={store} className="mx-auto">
                        <div className="mb-6 form-group">
                            <label htmlFor="name_pd"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                            <input value={name_pd} onChange={(e) => setName(e.target.value)} type="text"
                                id="name_pd" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Desc</label>
                            <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text"
                                id="desc" className="form-control" required/>
                        </div>
                        <div className="mb-6 form-group">
                            <label htmlFor="image"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
                            <input onChange={handleFileChange} type="file"
                                id="image" className="form-control" required/>
                        </div>
                            <div className="mb-6 form-group">
                                <label htmlFor="category_id"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">category</label>
                                    <select value={category_id} onChange={(e) => setCategory_id(e.target.value)} className='form-control' required>
                                    {categories.map((cate, index) => (
                                        <option key={cate.id} value={cate.id} selected={index === 1 ? 'selected' : ''}>
                                            {cate.name_cate}
                                        </option>
                                    ))}
                                    </select>
                            </div>
                            <div className="mb-6 form-group">
                                <label htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" id="price"
                                    className="form-control"
                                    required/>
                            </div>
                            <div className="col-start-4 col-end-7 form-group">
                                <label htmlFor="expiration_date"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration date</label>
                                <input value={expiration_date} onChange={(e) => setExpirationDate(e.target.value)} type="datetime-local" id="expiration_date"
                                    className="form-control"
                                    required/>
                            </div>

                        <br/>
                        <button type="submit" className="btn btn-primary">
                            Thêm sản phẩm
                        </button>
                    </form>
                </div>
            </div>
            
        </div>

    )
}

export default CreateProduct
