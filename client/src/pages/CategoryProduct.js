import React,{useState,useEffect} from 'react'
import Layout from '../component/layout/Layout'
import { useCart } from '../context/cart'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const API = "http://localhost:5080/api/v1";

const CategoryProduct = () => {
  const params=useParams()
  const navigate=useNavigate()
  const[cart,setCart]=useCart();
  const [ products,setProducts ]=useState([])
  const [ category,setCategory ]=useState([])

  useEffect(()=>{
if(params?.slug) getProductsByCat()
  },[params?.slug])

  const getProductsByCat=async()=>{
    try {
      const {data} = await axios.get(`${API}/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className='container mt-3'>
        <h4 className='text-center'>Category - {category?.name}</h4>
        <h6 className='text-center'>{products?.length} result found </h6>
        <div className='row'>
        <div className='col-md-9 offset-1'> 
        {/* {JSON.stringify(radio,null,4)} */}
      <h1 className='text-center'>All Products</h1>








<div className="d-flex flex-wrap">
  {products.map((p) => (
    <div
      className="card m-2"
      style={{ width: "18rem", display: "flex", flexDirection: "column" }}
      key={p._id}
    >
      {/* Product Image */}
      <img
        src={`${API}/product/product-photo/${p._id}`}
        className="card-img-top"
        alt={p.name}
        style={{ height: "200px", objectFit: "cover" }} // Fixed height for images
      />
      <div className="card-body" style={{ flex: "1" }}>
        {/* Product Name */}
        <h5 className="card-title">$ {p.name}</h5>
        {/* Description with truncation */}
        <p className="card-text text-truncate" style={{ minHeight: "50px" }}>
          {p.description.substring(0, 30)}...
        </p>
        {/* Price */}
        <p className="card-text">${p.price}</p>
        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
          <button className="btn btn-secondary ms-1" onClick={()=>{
            setCart([...cart,p])
            localStorage.setItem('cart',JSON.stringify([...cart,p]))
            toast.success('item added in cart')
          }}>ADD TO CART</button>
        </div>
      </div>
    </div>
  ))}
</div>




{/* <div className='m-2 p-3'>
  {products && products.length <total &&(
    <button className='btn btn-warning' onClick={(e)=>{e.preventDefault()
      setPage(page+1)
    }}>
{loading?"Loading ..." : "Loadmore"}
</button>
  )}

</div> */}

      </div>

        </div>
      </div>
    </Layout>
  )
}

export default  CategoryProduct

