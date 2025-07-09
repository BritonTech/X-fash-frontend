import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../Assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import Verify from '../../Pages/Verify/Verify'

export const Navbar = ({ setShowLogin }) => {


  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScollY) {
        // scrolling down
        setShowNavbar(false)
      } else {
        // scrolling up
        setShowNavbar(true)
      }
      setLastScrollY(currentScrollY);

    }
  };


  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => window.removeEventListener('scroll', controlNavbar);
    }

  }, [lastScollY]);



  const [menu, setMenu] = useState('Home')

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }


  return (
    <div className={`navbar ${showNavbar ? 'navbar--visible' : 'navbar--hidden'}`}>
      <Link to='/'><img src={assets.fash} alt="" className='nav-logo' /></Link>
      

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : "abc"}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : "abc"}>Menu</a>
        <a href='#footer' onClick={() => setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : "abc"}>Contact Us</a>
        <a href='#app-download' onClick={() => setMenu("Mobile App")} className={menu === "Mobile App" ? "active" : "abc"}>Mobile App</a>

      </ul>
      <div className="navbar-right">
        <Link to='/products'><img src={assets.search} alt=" Image cart product" className='logo-right' /></Link>
        <Link to='/chat' ><img src={assets.instagram} alt="" className='logo-right'/></Link>
        <Link to='/myorders'><img src={assets.black_bag} alt="" className='logo-right' /></Link>
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.cart_icon} alt="" className='logo-right' /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <Link to='/auth'><button onClick={() => setShowLogin(true)} >Sign In</button></Link>
          : <div className='navbar-profile'>
            <img src={assets.profile} alt=""  className='logo-profile'/>
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><img src={assets.shop_bag} alt="" className='logo-right' /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout} alt="" className='logo-right'/><p>Log out</p></li>
            </ul>
          </div>}
      </div>
    </div>


  )
}
export default Navbar;