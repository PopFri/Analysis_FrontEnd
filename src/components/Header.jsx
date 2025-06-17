import React, { useEffect, useState } from 'react'
import logo from '/images/popfriLogo.png'
import { Link } from 'react-router-dom'

export default function Header({location}) {
  const [homeColor, setHomeColor] = useState('#FFFFFF')
  const [monitoringColor, setMonitoringColor] = useState('#FFFFFF')

  useEffect(() => {
    if(location == 'home') setHomeColor('#1ED863');
    if(location == 'monitoring') setMonitoringColor('#1ED863')
  }, [location]);

  return (
    <div className='header'>
        <img src={logo} alt="" className='header-logo'/>
        <div className='header-link'>
            <Link to="/home" className='link-container' style={{borderBottomColor: homeColor}}>
                <p className='contianer-text' style={{color: homeColor}}>관리자 페이지</p>
            </Link>
            <Link to="/monitoring" className='link-container' style={{borderBottomColor: monitoringColor}}>
                <p className='contianer-text' style={{color: monitoringColor}}>모니터링 페이지</p>
            </Link>
        </div>
    </div>
  )
}
