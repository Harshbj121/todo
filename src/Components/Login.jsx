import React from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config';
import Swal from 'sweetalert2'
import './login.css'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const requestData = { email: email, password: password };
    axios.post(`${API_URL}/login`, requestData)
      .then((result) => {
        if (result) {
          console.log(result);
          Swal.fire({
            icon: 'success',
            title: 'Login Success'
          })
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('user', JSON.stringify(result.data.user));
          navigate('/')
        }
        setemail('');
        setpassword('');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error
        })
        console.log(error)
      })
  }
  return (
    <>
      <div className="d-flex justify-content-center mt-5" >
        <div className="shadow login-container pb-3" >
          <h1>Login Panel</h1>
          <form onSubmit={handleLogin} >
            <div className="d-flex flex-colun">
              <div className="mb-3 d-flex flex-column justify-content-center me-2" style={{ fontSize: '20px' }}>
                <label htmlFor="email" className="fw-bold mb-3">Email :</label>
                <label htmlFor="pass" className="fw-bold ">Password :</label>
              </div>
              <div className="mb-2 d-flex flex-column">
                <input type="email" className="mb-3 ps-1" id="email" value={email} onChange={e => setemail(e.target.value)} />
                <input type="text" className="ps-1" id="pass" value={password} onChange={e => setpassword(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary float-end w-100">Login</button>
          </form>
          <p className='mt-3'>Don't have account? <NavLink to="/register"><b className='fw-bold fs-5'>Register Here!!</b></NavLink></p>
        </div>
      </div>
    </>
  )
}

export default Login