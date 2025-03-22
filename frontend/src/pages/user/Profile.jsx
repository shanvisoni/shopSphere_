import React,{useState,useEffect} from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import axios from 'axios'
const API = "http://localhost:5080/api/v1";

const Profile = () => {
  const [auth,setAuth]=useAuth()

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

useEffect(()=>{
const {email,name,phone,address}=auth?.user
setEmail(email)
setName(name)
setPhone(phone)
setAddress(address)
},[auth?.user])

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {data} = await axios.put(`${API}/auth/profile`, { email, name, password, phone, address })
      if (data?.error) {
        toast.error(data?.error)

      }
      else {
        setAuth({...auth, user: data?.updatedUser})
        let ls=localStorage.getItem("auth")
        ls=JSON.parse(ls)
        ls.user=data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success('Profile Updated successfully')
      }
    } catch (error) {
      console.error('Somthing went wrong')
      toast.error('Somthing went wrong.  Please try again.')
    }

  };

  return (
    <Layout title={"Your Profile"}>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
      <div className='col-md-3'>
<UserMenu/>
      </div>
      <div className='col-md-9'>
<h1> <div className='form-container'>
       
        <form onSubmit={handleSubmit}>
 <h4 className='title'>USER PROFILE</h4>

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
         
              disabled
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

          <button type="submit" className="btn btn-primary">UPDATE</button>
        </form>
      </div></h1>
      </div>
      </div>
      </div>
    </Layout>
  )
}

export default Profile
