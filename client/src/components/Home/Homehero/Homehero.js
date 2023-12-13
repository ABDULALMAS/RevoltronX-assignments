import React , {useState}from 'react';

import './styles.css';
import BannerImg from '../../../assets/HomeHeroBannerImg.png';
import { Link} from 'react-router-dom'


const Homehero = () => {
  
 




  return (
    <div className='homeHeroMain'>
      <div className='homeHeroBanner'>
        <img src={BannerImg}></img>
        <div className='homeBannerText'>
        <h2>Get Started Digital Learning</h2>
        <button className='homeHeroButt'>Get Started</button>
        </div>

        
      </div>
  
      </div>
    
  )
}

export default Homehero