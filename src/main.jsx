import React from 'react'
import App from "./App.jsx"
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext.jsx'
import { CurrencyProvider } from './Context/CurrencyContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CurrencyProvider>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
    </CurrencyProvider>
  </BrowserRouter>

)

