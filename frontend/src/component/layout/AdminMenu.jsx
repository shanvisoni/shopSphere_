import React from 'react'
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
    <div className="text-center">

    <div class="list-group">
        <h4>Admin Pannel</h4>
      <NavLink 
        to="/dashboard/admin/create-category" 
        className="list-group-item" 
        activeClassName="active"
        aria-current="true"
      >
        Create Category
      </NavLink>
      <NavLink 
        to="/dashboard/admin/create-product" 
        className="list-group-item" 
        activeClassName="active"
      >
       Create Product
      </NavLink>
      <NavLink 
        to="/dashboard/admin/products" 
        className="list-group-item" 
        activeClassName="active"
      >
       Products
      </NavLink>
      <NavLink 
        to="/dashboard/admin/users" 
        className="list-group-item" 
        activeClassName="active"
      >
        Users
      </NavLink>
      </div> 
</div>
</>
  )
}

export default AdminMenu
