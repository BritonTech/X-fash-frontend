// import React, { useContext,useEffect,useState } from 'react'
// import { Link } from 'react-router-dom'
// import { StoreContext } from '../../Context/StoreContext'
// import ItemCard from '../ItemCard/ItemCard'
// import "./ItemDisplay.css"

// // // Helper function to shuffle items
// // const shuffleArray = (array) => {
// //   return [...array].sort(() => Math.random() - 0.5);
// // };

// // const ItemDisplay = ({ category, items }) => {
// //     const { all_product } = useContext(StoreContext);
// //     const filteredItems = (items || all_product).filter(item =>
// //         category === "All" ? true : item.category === category
// //     );
// //  const productsToUse = items || all_product;

// //   // ✅ Filter and shuffle once per render
// //   const shuffledItems = useMemo(() => {
// //     const filtered = productsToUse.filter(item =>
// //       category === "All" ? true : item.category === category
// //     );
// //     return shuffleArray(filtered);
// //   }, [productsToUse, category]);

// // 🔁 Helper function to shuffle array
// // const shuffleArray = (array) => {
// //   return [...array].sort(() => Math.random() - 0.5);
// // };

// // const ItemDisplay = ({ category, items }) => {
// //   const { all_product } = useContext(StoreContext);

// //   // 🔁 Use passed items (Home) OR all products (Products page)
// //   const productsToUse = items || all_product;

// //   // 🔁 Shuffle and filter once per render
// //   const shuffledItems = useMemo(() => {
// //     const filtered = productsToUse.filter(item =>
// //       category === "All" ? true : item.category === category
// //     );
// //     return shuffleArray(filtered);
// //   }, [productsToUse, category]);


// // Helper: shuffle array
// const shuffleArray = (array) => {
//   return [...array].sort(() => Math.random() - 0.5);
// };

// const ItemDisplay = ({ category, items }) => {
//   const { all_product } = useContext(StoreContext);
//   const productsToUse = items || all_product;

//   const [shuffledItems, setShuffledItems] = useState([]);

//   // Function to filter and shuffle
//   const shuffleProducts = () => {
//     const filtered = productsToUse.filter(item =>
//       category === "All" ? true : item.category === category
//     );
//     const shuffled = shuffleArray(filtered);
//     setShuffledItems(shuffled);
//   };

//   // ⏱ Shuffle on mount and every 5 seconds
//   useEffect(() => {
//     shuffleProducts(); // first shuffle
//     const interval = setInterval(shuffleProducts, 5000); // shuffle every 5s

//     return () => clearInterval(interval); // cleanup
//   }, [productsToUse, category]);


//     return (
//         <div className='item-display' id='item-display'>
//             <div className='products-header'>
//                 <h2>
//                     Top Outfits near you
//                 </h2>
//                 <Link to="/products"><button>View  All</button></Link>
//             </div>

//             <div className="item-display-list">
//                 {shuffledItems.map((item, index) => {

//                     if (category === "All" || category === item.category) {
//                         return <ItemCard key={index} id={item._id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image} description={item.description} />

//                     }


//                 })}
//             </div>

//         </div>
//     )
// }

// export default ItemDisplay
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import ItemCard from '../ItemCard/ItemCard';
import OfflineItemCard from '../OfflineItemCard/OfflineItemCard';
import LoadingMessage from '../LoadingStatus/LoadingStatus';
import './ItemDisplay.css';
import { offline_product } from '../../Assets/all_product';

// ✅ Helper to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ItemDisplay = ({ category = "All", items }) => {
  const { all_product } = useContext(StoreContext);
  const [shuffledItems, setShuffledItems] = useState([]);

  // 👇 Products to display: passed as props or from context
  const productsToUse = items || all_product;

  const shuffleProducts = () => {
    const filtered = productsToUse.filter(item =>
      category === "All" ? true : item.category === category
    );
    const shuffled = shuffleArray(filtered);
    setShuffledItems(shuffled);
  };

  // ⏱ Shuffle once on mount and then every 5 seconds
  useEffect(() => {
    shuffleProducts(); // Initial shuffle
    const interval = setInterval(shuffleProducts, 5000); // Re-shuffle every 5s

    return () => clearInterval(interval); // Cleanup
  }, [productsToUse, category]);

  return (
    <div className='item-display' id='item-display'>
      <div className='products-header'>
        <h2>Top Outfits near you</h2>
        <Link to="/products"><button>View All</button></Link>
      </div>

      <div className="item-display-list">
        {shuffledItems.length === 0 ? (
          <>
          {offline_product.map((it,index)=>(
                        <OfflineItemCard
              key={it._id || index}
              id={it._id}
              name={it.name}
              new_price={it.new_price}
              old_price={it.old_price}
              image={it.image}
              description={it.description}
            />
           
            
          ))}
           <LoadingMessage/>
           </>

        ) : (
          shuffledItems.map((item, index) => (
            <ItemCard
              key={item._id || index}
              id={item._id}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
              image={item.image}
              description={item.description}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ItemDisplay;
