import React, { useContext } from 'react'
import './ExploreMenu.css'
// import { menu_list } from '../../Assets/assets'
import { StoreContext } from '../../Context/StoreContext'

export const ExploreMenu = ({category,setCategory}) => {
    const {menu_list,url}= useContext(StoreContext);
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1 >Explore our Categories</h1>
        {/* <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of outfits crafted with the finest fabrics and culinary experties. Our mission is to satisfy your lust, desire and elevate your dress-code experience, one perfect design at a time. Scroll on the categories to explore more stunning designs.</p> */}
        <div className="explore-menu-list">
            {
                menu_list.map((item,index)=>{
                    return(
                        <div onClick={()=>setCategory(prev=>prev===item.category?"All":item.category)} key={index} className='explore-menu-list-item'>
                            <img className={category===item.category?"active":""} src={item.image} alt={item.category } />
                            <p className={category===item.category?"text-active":""}>{item.category}</p>

                        </div>
                    )

                })
            }
        </div>
        <hr  className="animated-gradient-hr" />
    </div>
  )
}
