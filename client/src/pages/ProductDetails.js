import Layout from '../component/layout/Layout'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import { toast } from 'react-toastify'
const API = "http://localhost:5080/api/v1";

const ProductDetails = () => {
    const params=useParams()
    const[cart,setCart]=useCart();
    const[product,setProduct]=useState({})
    const[relatedProduct,setRelatedProduct]=useState([])

    useEffect(()=>{
if(params?.slug) getProduct()
    },[params?.slug])

    // const getProduct=async()=>{
    //     try {
    //         const {data}=await axios.get(`/api/v1/product/single-product/${params.slug}`)
            
    // setProduct(data?.product);
    // getSimilarProduct(data?.product._id, data?.product.category._id);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }





    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `${API}/product/single-product/${params.slug}`
        );
    
        if (data?.product && data?.product._id) { 
          setProduct(data.product);
          getSimilarProduct(data.product._id, data.product.category._id);
        } else {
          console.error("Product ID is undefined."); 
        } 
      } catch (error) {
        console.log(error);
      }
    };



    const getSimilarProduct=async (pid,cid)=>{
      try {
      const { data } = await axios.get(`${API}/product/related-product/${pid}/${cid}`);
console.log("Similar Products API Response:", data);
console.log("PID:", pid);
console.log("CID:", cid);
console.log(data);
       setRelatedProduct(data?.products)

      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Layout>
      <div className='row container mt-2'>
        <div className='col-md-6'>
        <img src={`${API}/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}
        height="300"
        width={"350px"}/>
        </div>
        <div className='col-md-6 '>
            <h1 className='text-center'>Product Details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>Price : {product.price}</h6>
           <h6>Category : {product.category?.name || "No Category"}</h6>  
            <button className="btn btn-secondary ms-1"  onClick={()=>{
            setCart([...cart,product])
            localStorage.setItem('cart',JSON.stringify([...cart,product]));
            toast.success('item added in cart')
          }}>ADD TO CART</button>
          
            {/* <h6>Shipping : {product.shipping}</h6> */}
            </div>
      </div>

<hr/>

      <div className="row container">
  <h6>Similar Products</h6>
  {relatedProduct.length<1 && (
    <p className='text-center'>No Similar Products found</p>
    )}
  <div className="d-flex flex-wrap">
  {relatedProduct.map((p) => (
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
         
          <button className="btn btn-secondary ms-1" onClick={()=>{
            setCart([...cart,p])
            localStorage.setItem('cart',JSON.stringify([...cart,p]));
            toast.success('item added in cart')
          }}>ADD TO CART</button>
        </div>
      </div>
    </div>
  ))}
</div>

</div>
    </Layout>
  )
}

export default ProductDetails
