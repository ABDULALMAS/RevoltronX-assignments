import React from 'react'

const UploadPhoto = ({ profile }) => {
  return (
    <div className="ellipse">
         <img src={profile.photo}/>
            </div>
  )
}

export default UploadPhoto