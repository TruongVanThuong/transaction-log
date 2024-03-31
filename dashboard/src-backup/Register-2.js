import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { register } from "api/connect";
import { toast } from 'react-toastify'
const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");


    if (!fullName || !email || !password) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    } if (password.length < 8) {
      setErrorMessage('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }
    if (password !== rePassword) {
      setErrorMessage('Mật khẩu không trùng khớp!');
      return;
    }
    if (!isEmailValid(email)) {
      setErrorMessage('Địa chỉ email không hợp lệ.');
      return;
    }
    const info = { name: fullName, email, password }
    try {
      const response = await register(info);

      if (response && response.status) {
        toast.success(response.message)
        navigate('/login')
        setFullName("");
        setEmail("");
        setPassword("");
        setRePassword("");
      } else {
        setErrorMessage(response.message || "Đăng ký thất bại.");
        console.log('err');
      }
    } catch (error) {
      // Handle registration failure
      setErrorMessage("Đăng ký thất bại.");
      console.error("Registration failed:", error);
    }
  };


  return (
    <section>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="mb-5 text-center">Đăng Ký</h2>
            <form onSubmit={handleSubmit}>
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <div className="form-group">
                <label>Họ và tên:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  id="full_name"
                  name="full_name"
                  defaultValue={fullName}
                  required
                  style={{ border: "1px solid rgb(158, 152, 152)" }}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  defaultValue={email}

                  style={{ border: "1px solid rgb(158, 152, 152)" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  defaultValue={password}
                  required
                  style={{ border: "1px solid rgb(158, 152, 152)" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  defaultValue={rePassword}
                  required
                  style={{ border: "1px solid rgb(158, 152, 152)" }}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                <p className="float-right">
                  <Link to="/Login" className="text-danger">
                    Đăng Nhập
                  </Link>
                </p>
              </div>

              <button type="submit" className="btn btn-danger">
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
