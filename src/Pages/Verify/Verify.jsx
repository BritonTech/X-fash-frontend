// import React, { useContext, useEffect } from 'react'
// import "./Verify.css"
// import { useNavigate } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom'
// import { StoreContext } from '../../Context/StoreContext';
// import  axios  from 'axios';

// const Verify = () => {
// const [searchParams,setSearchParams] = useSearchParams();
// const success = searchParams.get("success")
// const orderId = searchParams.get("orderId")
// const {url} = useContext(StoreContext);
// const navigate = useNavigate();

// const verifyPayment = async() =>{
//     const response = await axios.post(url+"/api/order/verify",{success,orderId});
//     if (response.data.success) {
//         navigate("/myorders");
        
//     }
//     else{
//         navigate("/")
//     }
// }
// useEffect(()=>{
//   verifyPayment();
// },[])


//   return (
//     <div className='verify'>
//         <div className="spinner">
//         </div>
//                   <h4 className='logo-spinner'>X-FASH</h4>

//     </div>
//   )
// }

// export default Verify
import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url,token } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId },{headers:{token}});

      // console.log("Verification response:", response.data); // ✅ Check response

      if (response.data.success) {
        navigate("/myorders"); // ✅ Navigate to orders
      } else {
        navigate("/"); // ❌ This may be causing the issue if backend returns false
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/"); // Optional: fallback on error
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
      <h4 className='logo-spinner'>X-FASH</h4>
    </div>
  );
};

export default Verify;
