/* eslint-disable */
import React from 'react';

import './styles.css';
import BannerImg from '../../../assets/HomeHeroBannerImg.png';



const Homehero = () => {
  
 




  return (
    <div className='homeHeroMain'>
      <div className='homeHeroBanner'>
        <img src={BannerImg} alt='img'></img>
        <div className='homeBannerText'>
        <h2>Get Started Digital Learning</h2>
        <button className='homeHeroButt'>Get Started</button>
        </div>

        
      </div>
  
      </div>
    
  )
}

export default Homehero