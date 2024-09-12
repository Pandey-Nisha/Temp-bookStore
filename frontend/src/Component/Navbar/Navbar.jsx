import React, { useContext } from 'react';
import{Link} from 'react-router-dom';
import './Navbar.css'
import {assets} from '../../assets/assets'
import { useState } from 'react'
import { useNavigate } from'react-router-dom';
import axios from 'axios';
import { Storecontext } from '../../Context/Storecontext';
const Navbar = () => {

    const [menu,setMenu] = useState("home");
    const {getTotal} = useContext(Storecontext);
    const navigate = useNavigate();

    const handleLogout = async () =>{
      try {
        const response =  await axios.delete("http://localhost:8000/logout");
        if(response.data.success) {
          console.log(response.data);
          
          navigate('/logout');
        }
      } catch (error) {
        alert("Couldn't log out");
        navigate('/home');
      }
    }
    

  return (
    <div className='navbar'>
      <Link to="/home"><img src={assets.logo} alt='logo' className='logo'/></Link>

      <ul className="navbar-menu">
        <Link to="/home"><li onClick={()=> setMenu("home")} className={menu === "home"  ? "active" : ""}>Home</li></Link>
        <Link to="/menu"><li onClick={()=> setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li></Link>
        <Link to="/about"><li onClick={()=> setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>About</li></Link>
        <Link to="/contact-us"><li onClick={()=> setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>Contact us</li></Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
            <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotal()===0 ?"" : "dot"}></div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar;
