import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import { Cart } from './Pages/Cart/Cart';
import { PlaceOrder } from './Pages/Place-Order/Place-Order';
import { ExploreMenu } from './Components/ExploreMenu/ExploreMenu';
import Footer from './Components/Footer/Footer';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import AllProductDisplay from './Pages/Product-Display/Product-Display';
import Delivery from './Pages/Delivery/Delivery';
import About from './Pages/About/About';
import Privacy from './Pages/Privacy/Privacy';
import Payment from './Pages/Payment/Payment';
import Verify from './Pages/Verify/Verify';
import MyOrders from './Pages/MyOrders/MyOrders';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import ChatPage from './Pages/ChatPage/ChatPage';
import WhatsAppFormPage from './Pages/WhatsAppFormPage/WhatsAppFormPage';
import CurrencySelector from './Components/CurrencySelector/CurrencySelector';

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowSplash(false);
    }
  }, [location.pathname]);


  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      {location.pathname === '/' && showSplash ? (
        <SplashScreen />
      ) : (
        <div className='app'>
          <CurrencySelector /> {/* 💰 Always visible, fixed on screen */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/auth' element={<LoginPopup />} />
            <Route path='/about' element={<About />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/products' element={<AllProductDisplay />} />
            <Route path='/delivery' element={<Delivery />} />
            <Route path='/cart/delivery' element={<Delivery />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/myorders' element={<MyOrders />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/whatsapp-order' element={<WhatsAppFormPage />} />
          </Routes>
        </div>
      )}

    </>

  );
}

export default App;
