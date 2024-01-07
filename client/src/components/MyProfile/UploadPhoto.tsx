/* eslint-disable */
import React from 'react'

interface ProfileStata {
  profile: {

    userId?: string;
    _id? : number;
  photo?: string ;
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  DOB?: string;
  phoneNumber?: string;
  }
}

const UploadPhoto: React.FC<ProfileStata> = ({ profile }) => {
  return (
    <div className="ellipse">
         <img src={profile.photo} alt='img'/>
            </div>
  )
}

export default UploadPhoto