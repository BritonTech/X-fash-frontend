import React, { useState,useEffect, useContext } from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header'
import { ExploreMenu } from '../../Components/ExploreMenu/ExploreMenu'
import ItemDisplay from '../../Components/ItemDisplay/ItemDisplay'
import AppDownload from '../../Components/AppDownload/AppDownload'
import { menu_list } from '../../Assets/assets'
import Carousel from '../../Components/Carousel/Carousel'
import Verify from '../Verify/Verify';
import { StoreContext } from '../../Context/StoreContext';
import ChatWidget from '../../Components/ChatWidget/ChatWidget';

export const Home = () => {
  const images = menu_list.map(item => item.menu_image);
  const [showLogin, setShowLogin] = useState(false)

  const [category, setCategory] = useState("All");
  const { user,homeProducts, fetchRandomProducts } = useContext(StoreContext);
  console.log("User from context:", user);

   useEffect(() => {
    fetchRandomProducts(); // ✅ Load 20 products on homepage
  }, []);

  // ✅ Filter items by category
  const filteredItems = category === "All"
    ? homeProducts
    : homeProducts.filter(item => item.category === category);


  return (
    <div >
      <Navbar setShowLogin={setShowLogin} />

      {/* <Header /> */}
      {/* <Verify/> */}
      {/* <Carousel images={images}/> */}
      {/* <div className='home-welcome'>
       

        {user && (
          <h2 className="welcome-text">
            Welcome, <span className="user-name">{user.name}</span> 🎉
          </h2>
        )}
      </div> */}
      <Carousel/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <ItemDisplay category={category} items={homeProducts} />
      <AppDownload />
      <Footer />
      <ChatWidget/>

    </div>
  )
}
