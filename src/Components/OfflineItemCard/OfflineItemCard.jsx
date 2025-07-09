import React, { useContext } from 'react'
import { assets } from '../../Assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { Link } from 'react-router-dom'
import { div } from 'framer-motion/client'
import Price from '../Price/Price'

const OfflineItemCard = ({ id, name, old_price, new_price, description, image, category }) => {

{}    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)
 {}   return (
      <div className='item-card'>
  {}          <div className="item-card-img-container">
   {}             <img src={ image} alt="" className="item-card-image" />

                {!cartItems[id]
                    ? <div className='item-card-add' onClick={() => addToCart(id)}>
                        <p>ADD TO CART</p>
                        <img className='add'  src={assets.cart_icon} />
                        </div>
                    : <div className='item-card-cart-product'>
                        <div className='item-card-cart'>
                            <Link to='/cart'><p>CART</p></Link>
                        </div>
                        <div className='item-card-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.minus} alt="" className='remove-from-cart' />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add} alt="" className='add-to-cart' />
                        </div>

                    </div>

                }
            </div>
            <div className="item-card-info">
                <div className="item-card-name-rating">
                    <p>{name}</p>
                </div>
                {/* <p className="item-card-description">{description}</p> */}
                <div className="item-card-price">
                    <p className="item-card-new-price"> New Price:<br />  <Price amountInKES={new_price} /></p>
                    <p className="item-card-old-price">Old Price:<br />  <Price amountInKES={old_price} /></p>
                </div>

            </div>
        </div>
    )
}

export default OfflineItemCard