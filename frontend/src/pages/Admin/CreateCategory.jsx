import React,{useEffect,useState} from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import {  toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../component/Form/CategoryForm';
import { Button, Modal } from 'antd';
const API = import.meta.env.VITE_API_URL;
import './Home.css'; 

const CreateCategory = () => {
  const[categories,setCategories]=useState([])
const [name,setName]=useState("")
const[visible,setVisible]=useState(false)
const[selected,setSelected]=useState(null)
const[updatedName,setUpdatedName]=useState("")

//create category-------------
const handleSubmit=async(e)=>{
e.preventDefault()
try {
  const {data} = await axios.post(`${API}/category/create-category`,{name})
  if(data?.success){
    toast.success(`${name} is created`)
    getAllCategory();
  }
  else{
toast.error(data.message)
  }
} catch (error) {

  toast.error('Something went wrong in input form')
}
}



  const getAllCategory=async()=>{
    try {
      const {data} =await axios.get(`${API}/category/get-category`)
      if(data?.success){
        setCategories(data?.category)
      }
    } catch (error) {
      
      toast.error('Something went wrong in getting category');
    }
  }
  useEffect(()=>{
    getAllCategory()
  },[]);

const handleUpdate=async(e)=>{
  e.preventDefault()
try {
  const {data} = await axios.put(`${API}/category/update-category/${selected._id}`,{name:updatedName})
  if(data?.success){
    toast.success(`${updatedName} is updated `)
    setSelected(null)
    setUpdatedName("")
    setVisible(false)
    getAllCategory();
   }
   else{
 toast.error(data.message)
   }
} catch (error) {

  toast.error('Something went wrong in updating form')
}
}
const handleDelete=async(pId)=>{
try {
  const {data} = await axios.delete(`${API}/category/delete-category/${pId}`);
  if(data.success){
    toast.success(`category is deleted `)

    getAllCategory();
   }
   else{
 toast.error(data.message)
   }
} catch (error) {

  toast.error('Something went wrong in updating form')
}
}

  return (
    <Layout title={"Dashboard-Create Category"}>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1>Manage Category</h1>
            <div className='p-3 w-50'>
             <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="w-75">
            <table className="table">
  <thead>
    <tr>

      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {categories?.map((c)=>(
      <>
    <tr>
      {/* <td key={c._id}>{c.name}</td> */}
      <td style={{ color: "#00e6e6", fontWeight: "500" }}>{c.name}</td> 
           <td><button className='btn btn-primary ms-2' onClick={()=>{setVisible(true) ; setUpdatedName(c.name); setSelected(c);}}>Edit</button></td>
           <td><button className='btn btn-danger ms-2' onClick={()=>{handleDelete(c._id)}}>Delete</button></td>
    </tr>
     </>
     ))}
  </tbody>
</table>
<Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
  <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
</Modal>
            </div>
           
        </div>
    </div>
</Layout>
  )
}

export default CreateCategory
