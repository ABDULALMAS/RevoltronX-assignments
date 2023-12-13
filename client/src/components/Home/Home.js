import React from 'react'


import Homehero from './Homehero/Homehero'
import HomeDiscover from './HomeDiscover/HomeDiscover'
import Explore from './Explore/Explore'
import MeetStudents from './MeetStudents/MeetStudents'
import Footer from './Footer/Footer'

const Home = () => {
  return (
    <div>
        <Homehero />
        <HomeDiscover />
        <Explore />
        <MeetStudents />
        <Footer />
    </div>
  )
}

export default Home