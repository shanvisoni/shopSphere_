import React, { useState, useEffect } from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import {Select} from "antd"
import { useNavigate, useParams } from 'react-router-dom';
const {Option}=Select
const API = import.meta.env.VITE_API_URL;

const UpdateProduct = () => {
    const navigate=useNavigate()
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState([])
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState("")
  const [id,setId]=useState("")

    const params =useParams();

 const getSingleProduct=async()=>{
  try {
    const { data } = await axios.get(`${API}/product/single-product/${params.slug}`);
    console.log("Fetched product data:", data);
    if (data?.product) {
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setCategory(data.product.category._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
    }
  } catch (error) {

  }
 };

 useEffect(()=>{
  getSingleProduct();
//eslint-disable-next-line
 },[params.slug]);

    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${API}/category/get-category`)
        if (data?.success) {
          setCategories(data?.category)
        }
      } catch (error) {
     
        toast.error('Something went wrong in getting category');
      }
    }
  
    useEffect(() => {
      getAllCategory()
    }, []);
  
    const handleUpdate=async(e)=>{
      e.preventDefault()
      try {
        const productData=new FormData()
         productData.append("name",name)
         productData.append("description",description)
         productData.append("price",price)
         productData.append("quantity",quantity)
        photo && productData.append("photo",photo)
         productData.append("category",category)
     
      const { data } = await axios.put(`${API}/product/update-product/${id}`, productData);
      if (data?.success) {
        toast.success("Product updated successfully!");
        setTimeout(() => navigate('/dashboard/admin/products'), 1000);
      } else {
        toast.error("An error occurred while updating the product.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("An error occurred while creating the product.");
    }
    }

    //delete a product
    const handleDelete=async()=>{
      try {
        let answer=window.prompt('Are you sure want to delete this product ? ')
        if(!answer) return; 
        const {data} =await axios.delete(`${API}/product/delete-product/${id}`)
        toast.success('Product deleted succefully')
        setTimeout(() => navigate('/dashboard/admin/products'), 1000);
      } catch (error) {

toast.error('Something went wrong')
      }
    }
  return (
    <Layout>
    <div title={"Dashboard-Create Product"}>

      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1>Update product</h1>
          <div className="m-1 w-75">
            <Select bordered={false} placeholder="Select a category" size="large" showSearch className="form-select mb-3" onChange={(value)=>{setCategory(value)}}
               value={category}
               >
            {categories?.map((c)=>(
              <Option key={c._id} value={c._id}>{c.name}</Option>
            ))}
            </Select>
            <div className='mb-3'>
              <label className='btn btn-outline-secondary col-md-12'>
                {photo ? photo.name : "upload Photo"}
                <input type='file' name='photo' accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden/>
              </label>
            </div>
            <div className='mb-3'>
              {photo ? (
                <div className='text-center'>
                  <img src={URL.createObjectURL(photo)} alt='product_photo' height={'200px'} className='img img-responsive'/>
                  </div>
              ):(
                <div className='text-center'>
                <img src={`${API}/product/product-photo/${id}`}   alt='product_photo' height={'200px'} className='img img-responsive'/>
                </div>
              )}
            </div>
          
            <div className='mb-3'>
              <input type='text'
              value={name}
              placeholder='write a name'
              className='form-control'
              onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <input type='text'
              value={description}
              placeholder='write a description'
              className='form-control'
              onChange={(e)=>setDescription(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <input type='text'
              value={price}
              placeholder='write a price'
              className='form-control'
              onChange={(e)=>setPrice(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <input type='number'
              value={quantity}
              placeholder='write a quantity'
              className='form-control'
              onChange={(e)=>setQuantity(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <Select 
              bordered={false}
              size="large"
              showSearch
              className='form-select mb-3'
              onChange={(value)=>{
                setShipping(value);
              }}
              value={shipping ? "yes" : "No"}
              >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className='mb-3'>
              <button className='btn btn-primary' onClick={handleUpdate}>Update PRODUCT</button>
            </div>
            <div className='mb-3'>
              <button className='btn btn-danger' onClick={handleDelete}>DLETE PRODUCT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UpdateProduct
