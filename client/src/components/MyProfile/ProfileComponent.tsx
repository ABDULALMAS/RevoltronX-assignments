/* eslint-disable */
import React, { useState} from 'react'
import Form from './Form';
import './styles.css'



export const ProfileComponentCreate: React.FC = () => {
  const [edit , setEdit] = React.useState(false);
  const [upload, setUpload] = useState(false);
  const [currentId , setCurrentId] = useState<number | undefined>(0);





  const handleCreate = ()  => {
  setEdit(true)
  }

  const handleUpload = () => {
   
    
 
     setUpload(true);
     
  }
  return(
<>
    <button className="createUpload" onClick={handleUpload}>Upload Photo</button> 
     <div className="profileNameMain">

    <div className="profileNameDiv">
        <h3 className="profileHeadText">Your Name</h3>
        <p className="profileSubText">Enter Your Name</p>
    </div>
    <div className="profileEmailDiv">
     <h3 className="profileHeadText">Email</h3>
     <p className="profileSubText">Enter Email</p>
    </div>
    <div className="profileAgeDiv">
    <h3 className="profileHeadText">Your Age</h3>
    <p className="profileSubText">Enter Age</p>
    </div>
    <div className="profileGenderDiv">
     <h3 className="profileHeadText">Gender</h3>
     <p className="profileSubText">Enter Gender</p>
    </div>
    <div className="profileDOBDiv">
     <h3 className="profileHeadText">Date Of Birth</h3>
     <p className="profileSubText">Enter DOB</p>
    </div>
    <div className="profileMobileDiv">
     <h3 className="profileHeadText">Phone Number</h3>
     <p className="profileSubText">Enter Phone Number</p>
    </div>


 </div>
 <button className="profileEditButton" onClick={handleCreate}
    >Create Profile</button>
 <Form edit={edit} setEdit={setEdit}  upload={upload} setUpload={setUpload} currentId={currentId} setCurrentId={setCurrentId}/>
 </>
  )
}

interface ProfileState{
  profile:{

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

 
  






export const ProfileComponent: React.FC<ProfileState> = ({ profile }) => {
    
    const [currentId , setCurrentId] = useState<number | undefined>(0);
   const [edit , setEdit] = useState(false);
   const [upload , setUpload] = useState(false);


     
   const handleUpload = () => {
   setCurrentId(profile._id)
   

    setUpload(true);
    
 }

   const handleEdit = () => {
   setCurrentId(profile._id)
    setEdit(true);
    }
   

        
    
  return (
    
    <>
   
  
    <button className="upload" onClick={handleUpload}>Upload Photo</button> 



    <div className="profileNameMain">

    <div className="profileNameDiv">
        <h3 className="profileHeadText">Your Name</h3>
        <p className="profileSubText">{profile.name}</p>
    </div>
    <div className="profileEmailDiv">
     <h3 className="profileHeadText">Email</h3>
     <p className="profileSubText">{profile.email}</p>
    </div>
    <div className="profileAgeDiv">
    <h3 className="profileHeadText">Your Age</h3>
    <p className="profileSubText">{profile.age}</p>
    </div>
    <div className="profileGenderDiv">
     <h3 className="profileHeadText">Gender</h3>
     <p className="profileSubText">{profile.gender}</p>
    </div>
    <div className="profileDOBDiv">
     <h3 className="profileHeadText">Date Of Birth</h3>
     <p className="profileSubText">{profile.DOB}</p>
    </div>
    <div className="profileMobileDiv">
     <h3 className="profileHeadText">Phone Number</h3>
     <p className="profileSubText">{profile.phoneNumber}</p>
    </div>
 </div>
 


 <button className="profileEditButton" onClick={handleEdit}
              >Edit Profile</button>
 
 <Form edit={edit} setEdit={setEdit} currentId={currentId} setCurrentId={setCurrentId} upload={upload} setUpload={setUpload}/>

            
              </>
              
  )
}
