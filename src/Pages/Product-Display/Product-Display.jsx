// import React, { useContext } from 'react'
// import { StoreContext } from '../../Context/StoreContext'
// import ItemCard from '../../Components/ItemCard/ItemCard'
// import "./Product-Display.css"
// import { assets } from '../../Assets/assets'
// import { Link } from 'react-router-dom'

// const AllProductDisplay = ({ category }) => {
//     const { all_product } = useContext(StoreContext)
//     const {getTotalCartAmount} = useContext(StoreContext);
//     return (
//         <div className='product'>
//             <div className="product-header">
//                 <Link to='/'><img src={assets.home} alt="" className="back" /></Link>
//                 <div>
//                     <input type="text" className="search-input" placeholder='Search for your perfect products here...' />
//                     <img src={assets.search} alt="" className='search-icon' />
//                 </div>
//                 <div className='navbar-search-icon'>
//                     <Link to='/cart'><img src={assets.cart_icon} alt="" className='cart-cart-display' /></Link>
//                     <div className={getTotalCartAmount() === 0 ? "" : "indicator"}></div>
//                 </div>
//             </div>
//             <div className='item-display' >

//                 {/* <h2>
//                     Top Outfits near you
//                 </h2> */}

//                 <div className="item-display-list">
//                     {all_product.map((item, index) => {

//                         // if(category==="All"|| category===item.category){
//                         return <ItemCard key={index} id={item._id} name={item.name} new_price={item.new_price} old_price={item.old_price} image={item.image} description={item.description} />

//                         // }


//                     })}
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default AllProductDisplay
// import React, { useContext, useState } from 'react';
// import { StoreContext } from '../../Context/StoreContext';
// import ItemCard from '../../Components/ItemCard/ItemCard';
// import "./Product-Display.css";
// import { assets } from '../../Assets/assets';
// import { Link } from 'react-router-dom';
// import SearchBar from '../../Components/SearchBar/SearchBar'; // ✅ Import reusable search bar
// import EmptyState from '../../Components/EmptyState/EmptyState';

// const AllProductDisplay = ({ category }) => {
//     const { all_product } = useContext(StoreContext);
//     const { getTotalCartAmount } = useContext(StoreContext);

//     const [filteredProducts, setFilteredProducts] = useState(null);
//     const [selectedCategory, setSelectedCategory] = useState("All");

//     // Extract categories from all_product
//     const categories = ["All", ...new Set(all_product.map(p => p.category))];

//     // Apply category filter to either searched or all products
//     const displayedProducts = (filteredProducts ?? all_product).filter(product =>
//         selectedCategory === "All" || product.category === selectedCategory
//     );

//     return (
//         <div className='product'>
//             <div className="product-header">
//                 <Link to='/'><img src={assets.home} alt="Back" className="back" /></Link>

//                 {/* ✅ Reusable search bar */}
//                 <SearchBar allProducts={all_product} onSearchResults={setFilteredProducts} />

//                 <div className='navbar-search-icon'>
//                     <Link to='/cart'><img src={assets.cart_icon} alt="Cart" className='cart-cart-display' /></Link>
//                     <div className={getTotalCartAmount() === 0 ? "" : "indicator"}></div>
//                 </div>
//             </div>

//             {/* ✅ Category Filter */}
//             {/* <div className="category-filter">
//                 <label className='category-name' htmlFor="category">Search by Category➡️</label>
//                 <select
//                     id="category"
//                     className='category-select'
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     size={5}
//                 >
//                     {categories.map((cat, index) => (
//                         <option key={index} value={cat}>{cat}</option>
//                     ))}
//                 </select>

//                 {filteredProducts && (
//                     <button
//                         onClick={() => setFilteredProducts(null)}
//                         className="clear-button"
//                     >
//                         Clear Search ❌
//                     </button>
//                 )}
//             </div> */}
//             <div className="category-filter">
//                 {/* <label className="category-name">Search by Category ➡️</label> */}
//                 <div className="horizontal-category-scroll">
//                     {categories.map((cat, index) => (
//                         <div
//                             key={index}
//                             className={`category-item ${selectedCategory === cat ? "selected" : ""}`}
//                             onClick={() => setSelectedCategory(cat)}
//                         >
//                             {cat}
//                         </div>
//                     ))}
//                 </div>

//                 {filteredProducts && (
//                     <button
//                         onClick={() => setFilteredProducts(null)}
//                         className="clear-button"
//                     >
//                         Clear Search ❌
//                     </button>
//                 )}
//             </div>


//             <div className='item-display'>
//                 <div className="item-display-list">
//                     {displayedProducts.length > 0 ? (
//                         displayedProducts.map((item, index) => (
//                             <ItemCard
//                                 key={index}
//                                 id={item._id}
//                                 name={item.name}
//                                 new_price={item.new_price}
//                                 old_price={item.old_price}
//                                 image={item.image}
//                                 description={item.description}
//                             />
//                         ))
//                     ) : (
//                         <EmptyState
//                             message="No matching products found. Try a different keyword or category."
//                             animationUrl="https://assets6.lottiefiles.com/packages/lf20_jtbfg2nb.json"
//                         />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllProductDisplay;


import React, { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import ItemCard from '../../Components/ItemCard/ItemCard';
import "./Product-Display.css";
import { assets } from '../../Assets/assets';
import { Link } from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar';
import EmptyState from '../../Components/EmptyState/EmptyState';

const AllProductDisplay = () => {
    const { all_product, getTotalCartAmount } = useContext(StoreContext);

    const [filteredProducts, setFilteredProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [clearSignal, setClearSignal] = useState(false); // 🚨 for clearing input

    const categories = ["All", ...new Set(all_product.map(p => p.category))];

    const displayedProducts = (filteredProducts ?? all_product).filter(product =>
        selectedCategory === "All" || product.category === selectedCategory
    );

    const handleClearSearch = () => {
        setFilteredProducts(null);
        setClearSignal(prev => !prev); // Triggers clearing inside SearchBar
    };

    return (
        <div className='product'>
            <div className="product-header">
                {/* <Link to='/'><img src={assets.home} alt="Back" className="back" /></Link> */}
                <SearchBar
                    allProducts={all_product}
                    onSearchResults={setFilteredProducts}
                    clearSignal={clearSignal}
                />
                {/* <div className='navbar-search-icon'>
                    <Link to='/cart'><img src={assets.cart_icon} alt="Cart" className='cart-cart-display' /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

                </div> */}
            </div>

            <div className="category-filter">
                <div className="horizontal-category-scroll">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className={`category-item ${selectedCategory === cat ? "selected" : ""}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </div>
                    ))}
                </div>

                {/* {filteredProducts && (
                    <button
                        onClick={handleClearSearch}
                        className="clear-button"
                    >
                        Clear Search ❌
                    </button>
                )} */}
            </div>

            <div className='item-display'>
                <div className="item-display-list">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((item, index) => (
                            <ItemCard
                                key={index}
                                id={item._id}
                                name={item.name}
                                new_price={item.new_price}
                                old_price={item.old_price}
                                image={item.image}
                                description={item.description}
                            />
                        ))
                    ) : (
                        <div className='empty-component'>
                        <EmptyState
                            message="No matching products found. Try a different keyword or category."
                            animationUrl="https://assets6.lottiefiles.com/packages/lf20_jtbfg2nb.json"
                        />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllProductDisplay;

