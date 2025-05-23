import React, { useState, useEffect } from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import {Select} from "antd"
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
const {Option}=Select
const API = import.meta.env.VITE_API_URL;
import './Home.css';

const CreateProduct = () => {
  const navigate=useNavigate()
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState([])
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")
  const [photo, setPhoto] = useState("")

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

  const handleCreate=async(e)=>{
    e.preventDefault()
    try {
      const productData=new FormData()
       productData.append("name",name)
       productData.append("description",description)
       productData.append("price",price)
       productData.append("quantity",quantity)
       productData.append("photo",photo)
       productData.append("category",category)
   
    const { data } = await axios.post(`${API}/product/create-product`, productData);
    if (data?.success) {
      toast.success(data?.message);
      setTimeout(() => navigate('/dashboard/admin/products'), 1000);
    } else {
      toast.error("An error occurred while creating the product.");
    }
  } catch (error) {
    console.error("Error creating product:", error);
    toast.error("An error occurred while creating the product.");
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
            <h1>Create product</h1>
            <div className="m-1 w-75">
              {/* <Select bordered={false} placeholder="Select a category" size="large" showSearch className="form-select mb-3" onChange={(value)=>{setCategory(value)}}>
              {categories?.map((c)=>(
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
              </Select> */}

<Select
  placeholder="Select a category"
  value={category}
  onChange={(value) => setCategory(value)}
  showSearch
  size="large"
  suffixIcon={
    <DownOutlined
      style={{
        color: "#1890ff",
        cursor: "pointer",
        pointerEvents: "none"
      }}
    />
  }
  style={{ width: "100%", marginBottom: "1rem" }}
  dropdownStyle={{ backgroundColor: "white", color: "black" }}
  getPopupContainer={() => document.body} // ⬇️ Forces dropdown to body
>
  {categories?.map((c) => (
    <Option key={c._id} value={c._id}>
      <span style={{ color: "#1890ff" }}>{c.name}</span>
    </Option>
  ))}
</Select>

              <div className='mb-3'>
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "upload Photo"}
                  <input type='file' name='photo' accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden/>
                </label>
              </div>
              <div className='mb-3'>
                {photo && (
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)} alt='product_photo' height={'200px'} className='img img-responsive'/>
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
                {/* <Select 
                bordered={false}
                size="large"
                showSearch
                className='form-select mb-3'
                onChange={(value)=>{
                  setShipping(value);
                }}
                >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
                </Select> */}


<Select
  bordered={false}
  size="large"
  showSearch
  className="mb-3" // ✅ Removed `form-select` to avoid CSS conflict
  value={shipping ? "yes" : "No"}
  onChange={(value) => setShipping(value)}
  suffixIcon={
    <DownOutlined
      style={{
        color: "#1890ff",
        cursor: "pointer",
        pointerEvents: "none",
      }}
    />
  }
  style={{
    width: "100%",
    marginBottom: "1rem",
  }}
  dropdownStyle={{
    backgroundColor: "white",
    color: "black",
  }}
  getPopupContainer={() => document.body} // ✅ Fix dropdown direction
>
  <Option value="0">
    <span style={{ color: "#ff4d4f" }}>No</span>
  </Option>
  <Option value="1">
    <span style={{ color: "#52c41a" }}>Yes</span>
  </Option>
</Select>


              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
