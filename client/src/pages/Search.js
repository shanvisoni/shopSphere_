import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import Layout from '../component/layout/Layout'
import { useSearch } from '../context/search'
import { toast } from 'react-toastify'
const API = "http://localhost:5080/api/v1";

const Search = () => {
  const navigate=useNavigate();
const[cart,setCart]=useCart();
    const [values,setValues] = useSearch();
  return (
  <Layout title={'Search results'}>
       <div className='container'>
       <div className='text-center'>
      <h1>Search Results</h1>
      <h6>{values?.results.length<1? 'No Products Found' : `Found ${values?.results.length}`}</h6>
      <div className="d-flex flex-wrap mt-4">
  {Array.isArray(values?.results) &&values?.results.map((p) => (
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
            toast.success('Item added in cart')
          }}>ADD TO CART</button>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
    </Layout>
  )
}

export default Search
