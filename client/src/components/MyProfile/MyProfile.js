/* eslint-disable */
import React,{ useState, useMemo} from 'react'


  import { useSelector } from "react-redux";
 
  import {ProfileComponent} from './ProfileComponent';
  import { ProfileComponentCreate } from './ProfileComponent';
 
  import UploadPhoto from './UploadPhoto';



import "./styles.css";

// import useStyles from "./styles";
import Form from './Form';

const PhotoComponent = () => {
 
  // const [currentId , setCurrentId] = useState(null);
   const [upload , setUpload] = useState(false);
 
   const [edit , setEdit] = useState(false);
   const user = JSON.parse(localStorage.getItem("profile"));

 
   
     const profiles = useSelector((state) => state?.profiles);
     
     
     const myProfile = useMemo(
       () => profiles.filter((p) => p?.userId === user?.result?._id),
       [user, profiles]
     );
   
     
     let myProfileData = myProfile.length === 1 ? "userExists" : "userDoesNotExist"



 
 






   


   

    return (
         <div>
       

     

    {  
    
    myProfile?.map((profile) => (

      <UploadPhoto profile={profile} key={profile._id}/>
     ))

    }
     
     
        
    <Form upload={upload} setUpload={setUpload}/>
 <div className="profileContainer">
   

   { (myProfileData === "userDoesNotExist") ? (

     <ProfileComponentCreate />
   ) : (
    myProfile?.map((profile) =>(
      <ProfileComponent  profile={profile} edit={edit} myProfile={myProfile} key={profile._id} setEdit={setEdit}/>

      ))
      )
      
    }
   </div>
    </div>
  )  
}
    

const Profile = ({ setCurrentId}) => {
  return (
    <div className='homeMain'>
    <div className="homeBlueDiv">
     <p>MY PROFILE</p>
    </div>

    <div className="homeMainDiv">
    <PhotoComponent />
    </div>
    </div>
  )
}

export default Profile