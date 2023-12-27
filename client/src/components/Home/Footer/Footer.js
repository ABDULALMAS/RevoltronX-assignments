/* eslint-disable */
import React from 'react'

import './styles.css'

import footerIcons from '../../../assets/footerIcons.svg'

const Footer = () => {
  return (
    <div className='footerMain'>
        <h3>Pro Edu</h3>
        <p className='footerText1'>Office 41, Zawaya Buildin, Ghala Muscat, 
Sultanate of Oman</p>
<p className='footerText2'> Privacy Policy  |   Terms of use</p>
<img src={footerIcons} alt='img'/>
    </div>
  )
}

export default Footer