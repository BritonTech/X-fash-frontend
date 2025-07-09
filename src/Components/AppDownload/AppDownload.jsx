import React from 'react'
import { assets } from '../../Assets/assets'
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <div className='app-dowload-content'>
        <p className='app-download-text'>For Better Experience Download <br/> X-Fash App</p>
        <div className="app-download-platforms">
            <img src={assets.appstore} alt="" />
            <img src={assets.google} alt="" />
        </div>
        </div>

    </div>
  )
}

export default AppDownload