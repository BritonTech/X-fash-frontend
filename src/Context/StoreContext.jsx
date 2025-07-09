import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { menu_list } from "../Assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [all_product, setAllProduct] = useState([])
  const [homeProducts, setHomeProducts] = useState([]);
  const [menu_list, setMenuList]= useState([])
  const [carouselImages,setCarouselImages] =useState([]);
  const [loadingUser, setLoadingUser] = useState(true);



  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    }

    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if (token) {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart/add`, { itemId }, { headers: { token } })
    }

  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if (token) {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart/remove`, { itemId }, { headers: { token } })
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {

        let itemInfo = all_product.find((product) => product._id == item);
        if (itemInfo && itemInfo.new_price) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }

  const fetchAllProducts = async () => {
    // const response = await axios.get(url + "/api/product/list")
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/list`);

    setAllProduct(response.data.data)
  }

  // const fetchMenuList = async ()=>{
  //   try {
  //     const response = await axios.get(url +"/api/menu/list")
  //     if(response.data.success){
  //       setMenuList(response.data.data)
  //     }
  //   } catch (error) {
      
  //   }
  // }
  const fetchMenuList = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/menu/list`);
    if (response.data.success) {
      setMenuList(response.data.data);
    } else {
      toast.error("Failed to fetch products");
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    toast.error("Server error");
  }
};

  const fetchCarouselImage = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/carousel/list`);
    if (response.data.success) {
      setCarouselImages(response.data.data);
    } else {
      toast.error("Failed to fetch products");
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    toast.error("Server error");
  }
};


  // const fetchRandomProducts = async () => {
  //   const response = await axios.get(url + "/api/product/random");
  //   setHomeProducts(response.data.data);
  // };
  const fetchRandomProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/random`);
      if (res.data.success) {
        setHomeProducts(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching random products", err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart/get`, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        console.warn("Cart fetch failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }
  //Clear cart items
  const clearCart = () => {
    setCartItems({});
  };
  // ([cartItems])

  //   useEffect(() => {
  //   async function loadData() {
  //     const storedToken = localStorage.getItem("token");
  //     const storedUser = localStorage.getItem("user");

  //     if (storedToken) {
  //       setToken(storedToken);
  //       await loadCartData(storedToken);
  //     }

  //     if (storedUser) {
  //       try {
  //         const parsedUser = JSON.parse(storedUser);
  //         setUser(parsedUser); // ✅ This is what was missing
  //         console.log("Restored user from storage:", parsedUser);
  //       } catch (error) {
  //         console.error("Error parsing user from localStorage:", error);
  //       }
  //     }
  //   }

  //   loadData();
  // }, []);

  useEffect(() => {
    async function loadData() {
      await fetchCarouselImage();
      await fetchAllProducts();
      await fetchMenuList();
      await fetchRandomProducts();
      
     const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken) {
      setToken(savedToken);
      await loadCartData(savedToken);
    }

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse user from storage:", err);
      }
    }

    setLoadingUser(false); // ✅ done loading
  }

  loadData();
}, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);


  const contextValue = {
    all_product,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    clearCart,
    user,
    setUser,
    fetchAllProducts,
    fetchRandomProducts,
    homeProducts,
    fetchMenuList,
    menu_list,
    carouselImages,
    fetchCarouselImage,
    loadingUser,

  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )

}
export default StoreContextProvider;
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState("");
//   const [all_product, setAllProduct] = useState([]);
//   const url = "http://localhost:4000"; // Your backend base URL

//   // ✅ Add to Cart
//   const addToCart = async (itemId) => {
//     try {
//       if (!token) return console.warn("No token found");

//       const res = await axios.post(
//         `${url}/api/cart/add`,
//         { itemId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         setCartItems(res.data.cartData); // ✅ Updated cart from server
//       }
//     } catch (error) {
//       console.error("Add to cart failed:", error);
//     }
//   };

//   // ✅ Remove from Cart
//   const removeFromCart = async (itemId) => {
//     try {
//       if (!token) return;

//       const res = await axios.post(
//         `${url}/api/cart/remove`,
//         { itemId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         setCartItems(res.data.cartData); // ✅ Updated cart from server
//       }
//     } catch (error) {
//       console.error("Remove from cart failed:", error);
//     }
//   };

//   // ✅ Get Cart on Reload
//   const loadCartData = async (tokenVal) => {
//     try {
//       const res = await axios.get(`${url}/api/cart/getcart`, {
//         headers: {
//           Authorization: `Bearer ${tokenVal}`,
//         },
//       });

//       if (res.data.success) {
//         setCartItems(res.data.cartData);
//         console.log("Loaded cart:", res.data.cartData);
//       } else {
//         console.warn("Cart not loaded:", res.data.message);
//       }
//     } catch (error) {
//       console.error("Load cart error:", error);
//     }
//   };

//   // ✅ Get Products
//   const fetchAllProducts = async () => {
//     try {
//       const res = await axios.get(`${url}/api/product/list`);
//       setAllProduct(res.data.data);
//     } catch (error) {
//       console.error("Fetch products error:", error);
//     }
//   };

//   // ✅ Total
//   const getTotalCartAmount = () => {
//     let total = 0;
//     for (let item in cartItems) {
//       const product = all_product.find((p) => p._id === item);
//       if (product) {
//         total += product.new_price * cartItems[item];
//       }
//     }
//     return total;
//   };

//   // ✅ On load
//   useEffect(() => {
//     const init = async () => {
//       await fetchAllProducts();
//       const savedToken = localStorage.getItem("token");

//       if (savedToken) {
//         setToken(savedToken);
//         await loadCartData(savedToken);
//       }
//     };
//     init();
//   }, []);

//   return (
//     <StoreContext.Provider
//       value={{
//         all_product,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         url,
//         token,
//         setToken,
//       }}
//     >
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;
