import React,{useState,useEffect} from 'react'
import AdminMenu from '../../component/layout/AdminMenu'
import Layout from '../../component/layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL;

const Products = () => {
const [products,setProducts]=useState([])

const getAllProducts=async ()=>{
    try {
        const {data} =await axios.get(`${API}/product/get-product`)
        setProducts(data.products)
    } catch (error) {
        console.error(error);
        toast.error("something went wrong");
    }
};

useEffect(()=>{
    getAllProducts();
},[])

  return (
  
    <Layout>
    <div className='row'>
    <div className='col-md-3'>
   <AdminMenu/>
 </div>
 <div className='col-md-9'>
   <h1 className='text-center'>All Products List</h1>
   <div className='d-flex  flex-wrap'>
   {products.map((p) =>(
     <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'> 
      <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
     <img src={`${API}/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
     <div className="card-body">
       <h5 className="card-title">{p.name}</h5>
       <p className="card-text">
         {p.description}
       </p>
     </div>
     </div>
     </Link>
   
   ))}
   </div>
   </div>
   </div>
 </Layout>




  )
}

export default Products
