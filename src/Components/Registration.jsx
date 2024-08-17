import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { API_URL } from '../config'
import axios from 'axios'
import Swal from 'sweetalert2'

const Registration = () => {
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const requestData = { username: username, email: email, password: password };
    axios.post(`${API_URL}/register`, requestData)
      .then((result) => {
        if (result) {
          console.log(result);
          // localStorage.setItem('token', result.data.result.token);
          // localStorage.setItem('user', JSON.stringify(result.data.result.user));
          navigate('/login')
        }
        setemail('');
        setpassword('');
        setusername('')
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
          <form onSubmit={handleRegister} >
            <div className="d-flex flex-colun">
              <div className="mb-3 d-flex flex-column justify-content-center me-2" style={{ fontSize: '20px' }}>
                <label htmlFor="username" className="fw-bold mb-3">Username :</label>
                <label htmlFor="email" className="fw-bold mb-3">Email :</label>
                <label htmlFor="pass" className="fw-bold ">Password :</label>
              </div>
              <div className="mb-2 d-flex flex-column">
                <input type="text" className="mb-3 ps-1" id="username" value={username} onChange={e => setusername(e.target.value)} />
                <input type="email" className="mb-3 ps-1" id="email" value={email} onChange={e => setemail(e.target.value)} />
                <input type="text" className="ps-1" id="pass" value={password} onChange={e => setpassword(e.target.value)} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <p className='mt-3'>Already have account? <NavLink to="/login"><b className='fs-5'>Login Here!! </b></NavLink></p>
        </div>
      </div>
    </>
  )
}

export default Registration