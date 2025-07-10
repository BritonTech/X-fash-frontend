import React, { useContext, useState } from 'react'
import { assets } from '../../Assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import "./LoginPopup.css"
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext'
const LoginPopup = ({ }) => {

    const navigate = useNavigate();
    const { url, setToken, setUser } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Sign Up")
    const [showLogin, setShowLogin] = useState(true)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
          `${import.meta.env.VITE_API_URL}/user/login`

        } else {
       `${import.meta.env.VITE_API_URL}/user/register`
        }

        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            setUser(response.data.user); // ✅ Save user in context

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Optional backup

            setShowLogin(false)
            navigate('/')
        }
        else {
            alert(response.data.message)
        }
    }

    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <Link to='/'><img onClick={() => setShowLogin(false)} src={assets.cross} alt="" /></Link>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit' >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>

                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Alrerady have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>

        </div>
    )
}

export default LoginPopup