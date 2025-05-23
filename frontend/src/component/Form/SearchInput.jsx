import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;



const SearchInput = () => {
    const[values,setValues]=useSearch()
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
       const {data}=await axios.get(`${API}/product/search/${values.keyword}`)
       setValues({...values,results:data});
        navigate("/search")
        } catch (error) {
        }
    }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})}/>
        
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchInput
