import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../Assets/assets';
import axios from 'axios';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import Price from '../../Components/Price/Price';
const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // const fetchOrders = async () => {
    //     const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
    //     setData(response.data.data);
    // }
    const fetchOrders = async () => {
        try {
            const response = await axios.post(
               `${import.meta.env.VITE_API_URL}/order/userorders`,
                {},
                { headers: { token } }
            );
            if (response.data.success) {
                setData(response.data.data);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };


    useEffect(() => {
        if (token) {
            fetchOrders();
        }

    }, [token])



    return (
        <div>
            <Navbar />
            <div className='my-orders'>

                <h2>My Orders</h2>
                <div className="container">
                    {/* {data.map((order,index)=>{
                <div key={index} className="my-orders-order">
                    <img src={assets.cart} alt="" />
                    <p>{order.items.map((item,index)=>{
                        if (index===order.items.lenght-1) {
                            return item.name+"x"+item.quantity
                            
                        }
                        else{
                           return item.name+"x"+item.quantity+","
                              
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items:{order.items.lenght}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders()}>Track Orders</button>
                </div>
            })} */}
                    {data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.shop_bag} alt="tttttttt" className='shop-icon' />
                            <p>
                                {order.items.map((item, i) =>
                                    i === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `
                                )}
                            </p>
                            
                            <p><Price amountInKES={order.amount} /></p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Orders</button>
                        </div>
                    ))}

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default MyOrders