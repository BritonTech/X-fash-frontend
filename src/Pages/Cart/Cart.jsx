import React, { useContext, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import './Cart.css'
import { assets } from '../../Assets/assets'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Price from '../../Components/Price/Price'


export const Cart = () => {
  const [showLogin, setShowLogin] = useState(false)


  const navigate = useNavigate();

  const { cartItems, removeFromCart, getTotalCartAmount, url, all_product } = useContext(StoreContext)
  return (
    <div>
      <Navbar setShowLogin={setShowLogin} />

      <div className='cart'>
        <div className="cart-items">
          <h2>My Cart Items</h2>
          <div className="cart-items-title">
            <p className='title'>Items</p>
            <p className='title'>Title</p>
            <p className='title'>Price</p>
            <p className='title'>Quantity</p>
            <p className='title'>Total</p>
            <p className='title'>Remove</p>
          </div>
          <br />
          <hr />
          {all_product.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div>
                  <div className='cart-items-title cart-items-item'>
                    <img src={item.image} alt="" className='item' />
                    <p className='title-details'>{item.name}</p>
                    <p className='details'><Price amountInKES={item.new_price} /></p>
                    <p className='details'>{cartItems[item._id]}</p>
                    <p className='details'><Price amountInKES={item.new_price * cartItems[item._id]} /></p>
                    <img onClick={() => removeFromCart(item._id)} src={assets.trash} alt="remove" className='remove' />
                  </div>
                  <hr />
                </div>

              )
            }
          })}

        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotals</p>
                <p><Price amountInKES={getTotalCartAmount()} /></p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p><Price amountInKES={getTotalCartAmount() === 0 ? 0 : 75} /></p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b><Price amountInKES={getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 75} /></b>
              </div>
            </div>

            {/* {all_product.map((item, index) => {
              if (getTotalCartAmount() > 0) {
                return ( */}
            <div className='button-action'>
              <button onClick={() => getTotalCartAmount() >0 ? navigate('/order') : ""} className='cart-click'> CHECKOUT</button>
              {/* <button onClick={() => navigate('/order')} className='cart-click'>PROCEED TO CHECKOUT</button> */}

              <Link to='/products' ><button className="cart-click-add">ADD ITEMS</button></Link>
            </div>
            {/* )
        // }
                
              })
            } */}



          </div>
          <div className="cart-promocode">
            <div>
              <p>
                If you have a promocode, Enter it here
              </p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promocode' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>


      </div>
      <Footer />

    </div>
  )
}
