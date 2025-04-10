import React from 'react'
import { NavLink } from "react-router-dom";
import './Home.css'; // Custom CSS

const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      <h4 className="admin-title">🛠 Admin Panel</h4>
      <div className="admin-menu-list">
        <NavLink to="/dashboard/admin/create-category" className="admin-link">
          📂 Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="admin-link">
          🛒 Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="admin-link">
          📦 Products
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="admin-link">
          👥 Users
        </NavLink>
      </div>
    </div>
  );
}

export default AdminMenu
