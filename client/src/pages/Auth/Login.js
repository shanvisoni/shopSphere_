import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import Layout from '../../component/layout/Layout'
import {  toast } from 'react-toastify';
import "../../styles/authStyle.css"
import { useAuth } from "../../context/auth";
const API = "http://localhost:5080/api/v1";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [auth, setAuth] = useAuth(); 

    const navigate=useNavigate()
const loacation=useLocation();
  
    const handleSubmit = async(event) => {
      event.preventDefault();
  
try {
    const res=await axios.post(`${API}/auth/login`,{ email, password})
    if(res && res.data.success){
     toast.success(res.data.message)

     localStorage.setItem('auth', JSON.stringify(res.data));
     setAuth({ user: res.data.user, token: res.data.token });

     setTimeout(() => {
        navigate(loacation.state || '/');
    }, 1000); 
      
    }
    else{
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
<h4>Login Page</h4>
<form onSubmit={handleSubmit}>



<div className="mb-3">
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
          placeholder=' Enter Email'
      aria-describedby="emailHelp"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
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


<div className='mb-3'>
<button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
</div>
  
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    </div>
  </Layout>
  )
}

export default Login
