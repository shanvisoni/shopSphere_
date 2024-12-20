import React from 'react'
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
    <div className="text-center">

    <div class="list-group">
        <h4>Dashboard</h4>
      <NavLink 
        to="/dashboard/user/profile" 
        className="list-group-item" 
        activeClassName="active"
        aria-current="true"
      >
       Profile
      </NavLink>
      <NavLink 
        to="/dashboard/user/orders" 
        className="list-group-item" 
        activeClassName="active"
      >
       Orders
      </NavLink>

      </div> 
</div>
</>
  )
}

export default UserMenu
