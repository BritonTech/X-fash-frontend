import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='header' id='header'>
        <div className="header-contents">
            {/* <h2>Order your favourite outfits here</h2>
            <p>Choose from a diverse menu featuring a delectable array of outfits crafted with the finest fabrics and culinary experties. Our mission is to satisfy your cravings and elevate your dress-code experience, one perfect design at a time. </p> */}
            <Link to="/products"><button>View Products</button></Link>
        </div>
    </div>
  )
}
