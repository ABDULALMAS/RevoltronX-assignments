/* eslint-disable */
import React from 'react'

import './styles.css'

import exploreImg from "../../../assets/exploreImg.png"
import { Link } from 'react-router-dom'




const ReadyToJoinComponent: React.FC = () => {
    return(
        <div className='readyToJoinMain'>
            <div className='readyToJoinText'>
                <h3>Ready to join?</h3>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            </div>
            <Link to="/auth" style={{ textDecoration: 'none' }}>
            <button className='readyToJoinButt'>Register Now</button>
            </Link>
        </div>
    )
}

const Explore: React.FC = () => {
  return (
    <>
    <div className='exploreMain'>
        <img src={exploreImg} alt='img'/>
        <div>
            <h2 className='exploreHead'>Explore The elearning Institute</h2>
            <p className='exploreSubHead'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure.<br></br>
Anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined.</p>
        <div className='exploreStatistcs'>
            <div className='exploreDiv1'>
                <h3>3.2K+</h3>
                <p>Online Course</p>
            </div>
            <div className="exploreDiv1"> <h3>600+</h3>
                <p>Expert Member</p>
                </div>
            <div className="exploreDiv1">
            <h3>1k+</h3>
                <p>Rating & Review</p>
            </div>
        </div>
        <button className='exploreButt'>Read More</button>
        </div>
    </div>

    <ReadyToJoinComponent />
    </>
  )
}

export default Explore