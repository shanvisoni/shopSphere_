
import React from "react";
import { Link,NavLink , useNavigate } from "react-router-dom"
// import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import {  toast } from 'react-toastify';
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from 'antd';

const Header = () => {
  const[cart]=useCart()
  const [auth,setAuth] =useAuth();
  const categories=useCategory();
  // const navigate = useNavigate();

  const handleLogout=()=>{
setAuth({
  ...auth, user:null,token:''
})
localStorage.removeItem('auth')
toast.success("Logout successfully")

};
 
  return (
    <>
    

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>

             {/* Categories Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
               
                data-bs-toggle="dropdown"
               
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li> <Link to={"/categories"} className="dropdown-item">
                     All Categories
                    </Link></li>
                {categories?.map((c) => (
                  <li key={c._id}>
                   
                    <Link to={`/category/${c.slug}`} className="dropdown-item">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

              {
  !auth.user ? (
    <>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link">Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </li>
    </>
  ) : (
    <>
<li className="nav-item dropdown">
  <NavLink
    className="nav-link dropdown-toggle"
    to="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li>
    <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>
    Dashboard
</NavLink>

    </li>
  <li>
    <NavLink onClick={handleLogout} to="/login" className="nav-link">Logout</NavLink>
    </li>
  </ul>
</li>

    </>
  )
}
              
              <li className="nav-item">
              <Badge count={cart?.length} showZero>
      <NavLink to="/cart" className="nav-link">
                  Cart 
                </NavLink>
    </Badge>
              
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </>
  );
};

export default Header;





