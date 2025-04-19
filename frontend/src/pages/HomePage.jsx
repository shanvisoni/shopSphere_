// import React, { useEffect, useState } from 'react'
// import Layout from '../component/layout/Layout'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { Checkbox ,Radio} from 'antd'
// import { Prices } from '../component/Prices'
// import { useCart } from '../context/cart'
// import { toast } from 'react-toastify'
// import './HomePage.css';
// const API = import.meta.env.VITE_API_URL;

// const HomePage = () => {
//  const navigate=useNavigate();
//   const [cart,setCart]=useCart()
//   const [products,setProducts]=useState([])
//   const [categories,setCategories]=useState([])
//   const [checked,setChecked]=useState([])
//   const [radio,setRadio]=useState([])
//   const [total,setTotal]=useState(0)
//   const [page,setPage]=useState(1)
//   const [loading,setLoading]=useState(false)



// //get all category 
// const getAllCategory=async()=>{
//   try {
//     const {data} =await axios.get(`${API}/category/get-category`)
//     if(data?.success){
//       setCategories(data?.category)
//     }
//   } catch (error) {

//   }
// }


//   //get Total count
//   const getTotal=async(req,res)=>{
//     try {
//       const {data}=await axios.get(`${API}/product/product-count`)
//       setTotal(data?.total)
//     } catch (error) {
//     }
//   }

//   useEffect(()=>{
//     if(page === 1) return
//     loadMore()
//   },[page])

//   const loadMore=async()=>{
//     try {
//       setLoading(true)
//       const {data}=await axios.get(`${API}/product/product-list/${page}`)
//       setLoading(false)
//       setProducts([...products,...data?.products])
//     } catch (error) {
//       setLoading(false)
//     }
//   }
  
// const handleFilter=(value,id)=>{
//   let all=[...checked];
//   if(value){
//     all.push(id);
//   }
//   else{
//     all=all.filter((c)=>c !== id);
//   }
//   setChecked(all);
// }

// useEffect(()=>{
//   getAllCategory()
//   getTotal() 
// },[]);

// const getAllProducts=async()=>{
//   try {
//     setLoading(true)
//     const {data}=await axios.get(`${API}/product/product-list/${page}`)
//     setLoading(false)

//   setProducts(data.products);
//   } catch (error) {
//     setLoading(false)

//   }
  
// };

// useEffect(()=>{
// if(!checked.length || !radio.length)getAllProducts();
// },[checked.length,radio.length])

// useEffect(()=>{
//   if(checked.length || radio.length)filterProduct()
// },[checked,radio])



// //get filtered Product
// const filterProduct = async()=>{
//   try {
//     const {data} = await axios.post(`${API}/product/product-filters`,{checked,radio})
//     setProducts(data?.products)
//   } catch (error) {
//     console.log(error)
//   }
// }

//   return (
//     <Layout title={'All Products - Best offers'}>
//       <div className='row mt-3'> 
//       <div className='col-md-2'> 
// <h4 className='text-center'>Filter By Category</h4>
// <div className='d-flex flex-column'>
// {categories?.map((c)=>(
//   <Checkbox key={c._id} onChange={(e)=> handleFilter(e.target.checked, c._id)}>
// {c.name}
//   </Checkbox>
// ))}
// </div>
// <h4 className='text-center mt-4'>Filter By Price</h4>
// <div className='d-flex flex-column'>


// <Radio.Group onChange={(e )=> setRadio(e.target.value)}>

// {Prices?.map((p) =>(
//   <div key={p._id}>
//    <Radio value={p.array}>{p.name}</Radio> 
//   </div>
  
// ))}
// </Radio.Group>

// <div className='d-flex flex-column'>
// <button className='btn btn-danger' onClick={()=>window.location.reload()}>RESET FILTERS</button>
// </div>

// </div>
//       </div>
//       <div className='col-md-9 offset-1'> 
//         {/* {JSON.stringify(radio,null,4)} */}
//       <h1 className='text-center'>All Products</h1>








// <div className="d-flex flex-wrap">
//   {products.map((p) => (
//     <div
//       className="card m-2"
//       style={{ width: "18rem", display: "flex", flexDirection: "column" }}
//       key={p._id}
//     >
//       {/* Product Image */}
//       <img
//         src={`${API}/product/product-photo/${p._id}`}
//         className="card-img-top"
//         alt={p.name}
//         style={{ height: "200px", objectFit: "cover" }} // Fixed height for images
//       />
//       <div className="card-body" style={{ flex: "1" }}>
//         {/* Product Name */}
//         <h5 className="card-title">{p.name}</h5>
//         {/* Description with truncation */}
//         <p className="card-text text-truncate" style={{ minHeight: "50px" }}>
//           {p.description.substring(0, 30)}...
//         </p>
//         {/* Price */}
//         <p className="card-text">₹{p.price}</p>
//         {/* Buttons */}
//         <div className="d-flex justify-content-between">
//           <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
//           <button className="btn btn-secondary ms-1" onClick={()=>{
//             setCart([...cart,p])
//             localStorage.setItem('cart',JSON.stringify([...cart,p]))
//             toast.success('Item added to cart')
//           }}>ADD TO CART</button>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>




// <div className='m-2 p-3'>
//   {products && products.length <total &&(
//     <button className='btn btn-warning' onClick={(e)=>{e.preventDefault()
//       setPage(page+1)
//     }}>
// {loading?"Loading ..." : "Loadmore"}
// </button>
//   )}

// </div>

//       </div>

//       </div>
   
//     </Layout>
//   )
// }

// export default HomePage














import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Radio, Spin, Skeleton } from 'antd'
import { Prices } from '../component/Prices'
import { useCart } from '../context/cart'
import { toast } from 'react-toastify'
import './HomePage.css';

const API = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  //get all category 
  const getAllCategory = async () => {
    try {
      setCategoriesLoading(true)
      const { data } = await axios.get(`${API}/category/get-category`)
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast.error("Failed to load categories")
    } finally {
      setCategoriesLoading(false)
    }
  }

  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${API}/product/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.error("Error fetching product count:", error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API}/product/product-list/${page}`)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.error("Error loading more products:", error)
      toast.error("Failed to load more products")
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  }

  useEffect(() => {
    getAllCategory()
    getTotal()
    getAllProducts()
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API}/product/product-list/${page}`)
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to load products")
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])

  //get filtered Product
  const filterProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${API}/product/product-filters`, { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.error("Error filtering products:", error)
      toast.error("Failed to filter products")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title={'All Products - Best offers'}>
      <div className='row mt-3'>
        <div className='col-md-2'>
          <h4 className='text-center'>Filter By Category</h4>
          {categoriesLoading ? (
            <div className="d-flex flex-column">
              {[...Array(5)].map((_, i) => (
                <Skeleton.Input key={i} active style={{ width: '80%', marginBottom: '8px' }} />
              ))}
            </div>
          ) : (
            <div className='d-flex flex-column'>
              {categories?.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
          )}

          <h4 className='text-center mt-4'>Filter By Price</h4>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            <div className='d-flex flex-column'>
              <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTERS</button>
            </div>
          </div>
        </div>
        <div className='col-md-9 offset-1'>
          <h1 className='text-center'>All Products</h1>

          {initialLoad ? (
            <div className="d-flex flex-wrap">
              {[...Array(6)].map((_, i) => (
                <div className="card m-2" style={{ width: "18rem" }} key={i}>
                  <Skeleton.Image active style={{ width: '100%', height: '200px' }} />
                  <div className="card-body">
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="d-flex flex-wrap">
                {products.length > 0 ? (
                  products.map((p) => (
                    <div
                      className="card m-2"
                      style={{ width: "18rem", display: "flex", flexDirection: "column" }}
                      key={p._id}
                    >
                      <img
                        src={`${API}/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/200?text=Product+Image';
                        }}
                      />
                      <div className="card-body" style={{ flex: "1" }}>
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text text-truncate" style={{ minHeight: "50px" }}>
                          {p.description.substring(0, 30)}...
                        </p>
                        <p className="card-text">₹{p.price}</p>
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                          <button className="btn btn-secondary ms-1" onClick={() => {
                            setCart([...cart, p])
                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                            toast.success('Item added to cart')
                          }}>ADD TO CART</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-100 text-center">
                    <h3>No products found</h3>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>

              <div className='m-2 p-3 text-center'>
                {products && products.length < total && (
                  <button className='btn btn-warning' onClick={(e) => {
                    e.preventDefault()
                    setPage(page + 1)
                  }}>
                    {loading ? <Spin size="small" /> : "Load more"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage