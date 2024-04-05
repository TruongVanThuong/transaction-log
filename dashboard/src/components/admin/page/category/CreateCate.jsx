import React, {useState} from 'react'
import axios from 'axios'

const endpoint = 'http://localhost:8001/api/admin/category'

const CreateCate = () => {
  const [name_cate,setNameCate] = useState('');
  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post(`${endpoint}/add`, {
      name_cate: name_cate
    })
    alert('Them san pham thanh cong');
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

export default CreateCate;
