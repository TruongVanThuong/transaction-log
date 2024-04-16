import React, {useState} from "react";
import Axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import env from '../../../../env';

const { endpointAdmin } = env();
// const endpoint = 'http://localhost:8001/api/admin/role'

const CreateRole = () => {
  const [name_role,setNameRole] = useState('');
  const [number_role,setNumberRole] = useState('');
  const [nameRoleError, setNameRoleError] = useState('');
  const [numberRoleError, setNumberRoleError] = useState('');

  const handleNameRoleChange = (e) => {
    setNameRole(e.target.value);
    setNameRoleError(''); 
  }

  const handleNumberRoleChange = (e) => {
    setNumberRole(e.target.value);
    setNumberRoleError(''); 
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${endpointAdmin}/role/add`, {
          name_role: name_role,
          number_role: number_role
      });
      if (response.data && response.data.status) {
        toast.success(response.data.message);
        console.log("oke");
      } else {
        toast.error(' error status ');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        if (serverErrors.name_role) {
            setNameRoleError(serverErrors.name_role[0]);
        }
        if (serverErrors.number_role) {
            setNumberRoleError(serverErrors.number_role[0]);
        }
      } else {
          console.error('Server error:', error);
          alert('An error occurred. Please try again later.');
      }
    }
  }
  return(
    <div className="row justify-content-center pt-5">
        <div className="col-sm-12">
            <div className=" p-4">
                <h1 className="text-center mb-3">Add Role</h1>
                <div className="form-group">
                    <label>name role:</label>
                    <input type="text" className="form-control" placeholder="name role" 
                      id="name_role" value={name_role} onChange={handleNameRoleChange}/>
                    {nameRoleError && <span className="text-danger">{nameRoleError}</span>}
                </div>
                <div className="form-group">
                    <label>number role :</label>
                    <input type="text" className="form-control" placeholder="number role" 
                      id="number_role" value={number_role} onChange={handleNumberRoleChange}/>
                    {numberRoleError && <span className="text-danger">{numberRoleError}</span>}
                </div>
                <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Add Role</button>
            </div>
        </div>
    </div>
  )
}

export default CreateRole;