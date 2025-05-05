import React from 'react'
import logo from '/images/popfriLogo.png'
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <div className='header'>
        <img src={logo} alt="" className='header-logo'/>
        <div className='header-link'>
            <Link to="/home" className='link-container' style={{borderBottomColor: `#1ED863`}}>
                <p className='contianer-text' style={{color: `#1ED863`}}>관리자 페이지</p>
            </Link>
        </div>
    </div>
  )
}
