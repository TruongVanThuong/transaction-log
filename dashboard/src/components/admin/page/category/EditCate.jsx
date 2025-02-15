import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import { toast } from 'react-toastify';
import env from '../../../../env';

const { endpointApi } = env();
// const endpoint = "http://localhost:8001/api/admin/category";

const EditCate = () => {
  const [name_cate, setNameCate] = useState('')
  const [name_cate_error, setNameCateError] = useState('')
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const GetCateByID = async () => {
      const response = await axios.get(`${endpointApi}/admin/category/edit/${id}`)
      setNameCate(response.data.name_cate)
    }
    GetCateByID()
  }, [id])

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${endpointApi}/admin/category/update/${id}`, {
        name_cate: name_cate,
      });
      if (response.data && response.data.status) {
        toast.success(response.data.message);
        navigate('/admin/category')
      } else {
        toast.error(' error status ');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        if (serverErrors.name_cate) {
          setNameCateError(serverErrors.name_cate[0]);
        }
      } else {
          console.error('Server error:', error);
      }
    }
  }

  return(
    <div className="row justify-content-center pt-5">
        <div className="col-sm-12">
            <div className=" p-4">
                <h1 className="text-center mb-3">Add category</h1>
                <div className="form-group">
                    <label>name category:</label>
                    <input type="text" className="form-control" placeholder="category" 
                    id="name_cate" value={name_cate} onChange={(e) => setNameCate(e.target.value)}/>
                    {name_cate_error && <span className="text-danger">{name_cate_error}</span>}
                </div>
                <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Add category</button>
            </div>
        </div>
    </div>
  )
}

export default EditCate;

