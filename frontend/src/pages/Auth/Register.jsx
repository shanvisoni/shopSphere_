import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Layout from '../../component/layout/Layout'
import { toast } from 'react-toastify';
import "../../styles/authStyle.css"
import { useAuth } from "../../context/auth";
const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(`${API}/auth/register`, { email, name, password, phone, address, answer })
      if (res && res.data.success) {
        toast.success(res.data.message)

        localStorage.setItem('auth', JSON.stringify(res.data));
        setAuth({ user: res.data.user, token: res.data.token });

        setTimeout(() => {
          navigate('/login');
        }, 1000);

      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.error('Somthing went wrong')
      toast.error('Somthing went wrong.  Please try again.')
    }

  };

  return (
    <Layout title="Register - Ecommer App">
      <div className='register'>
        <h1>Register Page</h1>
        <form onSubmit={handleSubmit}>


          <div className="mb-3">
            <input
              type="text" // Change to "text" for a name input
              className="form-control"
              id="exampleInputName"
              placeholder=' Enter Name'
              aria-describedby="nameHelp"
              value={name}
              onChange={(e) => setName(e.target.value)} // Change to setName
            />

          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder=' Enter Email'
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>



          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder=' Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="tel" // Using "tel" for phone input
              className="form-control"
              id="exampleInputPhone"
              placeholder=' Enter phone number'
              aria-describedby="phoneHelp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Address Field */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder='Enter your address'
              aria-describedby="addressHelp"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder='what is Your favourite sports'
              aria-describedby="addressHelp"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
