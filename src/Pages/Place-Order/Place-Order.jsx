import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import './Place-Order.css'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ important!




export const PlaceOrder = () => {


  const [showLogin, setShowLogin] = useState(false)

  const navigate = useNavigate();

  const { getTotalCartAmount, token, product_list, cartItems, url, all_product, clearCart } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    street: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""


  })

  const [phoneError, setPhoneError] = useState(""); // ✅ Error for phone

  const onChangeHandler = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    setData(data => ({ ...data, [name]: value }))
  }

  //  const placeOrder =async(event)=>{
  //   event.preventDefault();
  //   let orderItems = [];
  //   product_list.map((item)=>{
  //     if (cartItems[item._id]>0) {
  //       let itemInfo =item;
  //       itemInfo["quantity"]=cartItems[item._id];
  //       orderItems.push(itemInfo);
  //     }
  //   })
  //    let orderData = {
  //     userId:token,
  //     address:data,
  //     items:orderItems,
  //     amount:getTotalCartAmount()+75,
  //     phone:data.phone
  //   } 
  //   console.log("Placing order with:", orderData);

  //   let response = await axios.post(url+"/api/order/place",orderData,{headers: {token}})
  //   if (response.data.success) {
  //     const {session_url}=response.data;
  //     window.location.replace(session_url);

  //   }

  //   else{
  //     alert("Error")
  //     console.error("Error placing order",response.data.message);
  //     navigate('/cart')
  //   }
  //   console.log("PLACE ORDER clicked");

  //  }
  const placeOrder = async (event) => {
    event.preventDefault();
    // console.log("PLACE ORDER clicked");
    // console.log("product_list:", product_list);
    if (!all_product) {
      alert("Product list not loaded. Please try again.");
      return;
    }

    const digitsOnly = data.phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }



    let orderItems = [];

    all_product.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      // userId: token, // assuming token = userId
      phone: digitsOnly,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 75
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/order/place`, orderData, {
        headers: { token }
      });

      // console.log("Server response:", response.data);

      if (response.data.success) {
        toast.success(response.data.message)
        // alert("Order placed successfully!");
        clearCart();
        navigate('/myorders');
      } else {
        alert("Order failed. Try again.");
        navigate('/cart');
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Order error.");
      navigate('/cart');
    }
  };


  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')

    }

  }, [token])

  return (
    <div>
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />

      <form onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
            <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
          </div>
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' required />
          <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
          <div className="multi-fields">
            <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City/County' required />
            <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
          </div>
          <div className="multi-fields">
            <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' required />
            <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
          </div>
          <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" maxLength={10} placeholder='Phone number' required />
          <div className='error-message'>
            <p className='error'>{phoneError}</p>
          </div>
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotals</p>
                <p>Ksh{" "}{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Ksh{" "}{getTotalCartAmount() === 0 ? 0 : 75}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>Ksh{" "}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 75}</b>
              </div>

            </div>
            <button type='submit' className='place-order-button' >PLACE ORDER</button>
          </div>


        </div>



      </form>

      <Footer />
      <ToastContainer position="top-right" autoClose={4000} />


    </div>
  )
}
