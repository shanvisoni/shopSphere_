import React from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import Layout from '../component/layout/Layout'
const API = "http://localhost:5080/api/v1";

const CartPage = () => {
    const [cart,setCart]=useCart()
    const [auth,setAuth]=useAuth()
    const navigate=useNavigate()

const totalPrice=()=>{
  try {
    let total=0;
    cart?.map((item)=> { total=total + item.price})
    return total.toLocaleString("en-us",{
      style:"currency",
      currency:"USD",
    })
  } catch (error) {
   
  }
}

    const removeCartItem=(pid)=>{
      try {
        let myCart=[...cart]
        let index=myCart.findIndex(item=>item._id === pid)
        myCart.splice(index,1)
        setCart(myCart);
        localStorage.setItem('cart',JSON.stringify(myCart))
      } catch (error) {
       
      }
    }
  return (
    <Layout>
    <div className='container'>
 <div className='row'>
 <div className='col-md-12'>
 <h1 className='text-center bg-light p-2 mb-1'>
      {`Hello ${auth?.token && auth?.user?.name}`}
      </h1>
      <h4 className='text-center'>
      {cart?.length ? `You have ${cart.length} items in your cart ${auth?.token? "" : "Please login to checkout"} `:"Your cart is empty"}
      </h4>
      </div>
    </div>
    <div className='row'>
    <div className='col-md-8'>
{
  cart?.map(p=>(
    <div className='row m-2 card flex-row'>
        <div className='col-md-4'>
        <img
        src={`${API}/product/product-photo/${p._id}`}
        className="card-img-top"
        alt={p.name}
        // style={{ height: "200px", objectFit: "cover" }} // Fixed height for images
        width="100px"
        height={'100px'}
      />
    </div>
    <div className='col-md-8'>
          <h4>{p.name}</h4>
          <p>{p.description.substring(0,30)}</p>
          <p>Price: ${p.price} </p>
          <button className='btn btn-danger' onClick={()=> removeCartItem(p._id)}>Remove</button>
    </div>
    </div>

  ))
}
</div>
<div className='col-md-4 text-center'>
<h2>Cart Summery</h2>
<p>Total |  Checkout | Payment</p>
<hr />
<h4>Total : {totalPrice()}</h4>
{auth?.user?.address?(
  <>
  <div className='mb-3'>
    <h4>Current Address</h4>
    <h5>{auth?.user?.address}</h5>
    <button className='btn btn-outline-warning'
    onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>

  </div>
  </>
):(
  <div className='mb-3'>
    {
      auth?.token?(
        <button className='btn btn-outline-warning' onClick={()=> navigate('/dashboard/user/profile')}>Update Address</button>
      ):(
        <button className='btn btn-outline-warning' onClick={()=> navigate('/login')}>Please login to checkout</button>
      )
    }
  </div>
)}
</div>
    </div>
    </div>
   
    </Layout>
  )
}

export default CartPage
