import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const endpoint = "http://localhost:8001/api/admin/category";

const EditCate = () => {
  const [name_cate, setNameCate] = useState('')
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const GetCateByID = async () => {
      const response = await axios.get(`${endpoint}/edit/${id}`)
      setNameCate(response.data.name_cate)
    }
    GetCateByID()
  }, [id])

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`${endpoint}/update/${id}`, {
      name_cate: name_cate,
    })
    navigate('/admin/category')
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
                </div>
                <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Add category</button>
            </div>
        </div>
    </div>
  )
}

export default EditCate;

