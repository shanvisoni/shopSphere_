import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Layout from '../../component/layout/Layout'
import {  toast } from 'react-toastify';
import "../../styles/authStyle.css"

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    

    const navigate=useNavigate()
  
    const handleSubmit = async(event) => {
      event.preventDefault();
  
try {
    const res=await axios.post('/api/v1/auth/forgot-password',{ email, newPassword,answer})
    if(res && res.data.success){
     toast.success(res.data.message)

     setTimeout(() => {
        navigate('/login');
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
    <Layout title={'Forgot Password - Ecommerce App'}>
      <div className='register'>
<h4>Reset Password</h4>
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
      type="text"
      className="form-control"
      id="exampleInputEmail1"
          placeholder=' Enter Your favorite Sport Name'
      aria-describedby="emailHelp"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
    />
  </div>

  <div className="mb-3">
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
        placeholder=' Enter Password'
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
  </div>


  
  <button type="submit" className="btn btn-primary">Reset</button>
</form>
    </div>
    </Layout>
  )
}

export default ForgotPassword
