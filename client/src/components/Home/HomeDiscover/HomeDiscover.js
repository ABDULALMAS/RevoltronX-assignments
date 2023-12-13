import React from 'react'
import "./styles.css";

import { exampleData } from '../../../constants/constants'




const DiscoverCardComponent = ({ img, heading, description, price}) => {
    return(
        <div className='DiscoverCardMain'>
            <img src={img}/>
            <div>
                <h3>{heading}</h3>
                <p className='discoverCardDesc'>{description}</p>
                <p className='discoverCardPrice'>Price : {price}</p>
            </div>
        </div>
    )
}

const HomeDiscover = () => {
  return (
    <div>
   <h2 className='homeDiscoverHead'>Discover Our Popular Courses</h2>
   <p className='homeDiscoverSubHead'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

     <div className='homeDiscoverCard'>
        {
            exampleData.map((data) =>(

                <DiscoverCardComponent 
                img={data.img}
                heading={data.heading}
                description={data.description}
                price={data.price}
                />
            ))
        }
     </div>
     <button className='discoverCardButt'>See More Courses</button>
    </div>
  )
}

export default HomeDiscover