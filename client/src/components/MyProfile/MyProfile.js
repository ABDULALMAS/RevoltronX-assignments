import React,{ useState, useEffect} from 'react'

import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
    TextField,
    Dialog,
    MenuItem,
    
    
  } from "@material-ui/core";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { createProfile , updateProfile} from '../../actions/profile';
  import {ProfileComponent} from './ProfileComponent';
  import { ProfileComponentCreate } from './ProfileComponent';
 
  import UploadPhoto from './UploadPhoto';


import FileBase from "react-file-base64";

import "./styles.css";

import useStyles from "./styles";
import Form from './Form';
import { getProfile } from '../../actions/profile';

const PhotoComponent = () => {
 
  const [currentId , setCurrentId] = useState(null);
   const [upload , setUpload] = useState(false);
   const [create, setCreate] = useState(false)
   const [editComponent , setEditComponent] = useState(false)
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [edit , setEdit] = useState(false);
   const user = JSON.parse(localStorage.getItem("profile"));

 

  const profiles = useSelector((state) => state.profiles)
  console.log(profiles)

  const  myProfile = useSelector((state) => state?.profiles.filter((p) => p?.userId === user?.result?._id))
  console.log(myProfile)
  
   let myProfileData = myProfile.length === 1 ? "userExists" : "userDoesNotExist"




   const [profileData, setProfileData] = useState({
    photo: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    DOB: "",
    phoneNumber: ""
   })
const classes = useStyles();

    const handleUpload = () => {
       setUpload(true);
       
    }


    const clear = () => {
              setCurrentId(0);
              setProfileData({photo: "",
              name: "",
              email: "",
              age: "",
              gender: "",
              DOB: "",
              phoneNumber: "" });
            };

    return (
         <div>
       

     

    {  
    
    myProfile?.map((profile) => (

      <UploadPhoto profile={profile}/>
     ))

    }
     
     
        
            {/* <button className="upload" onClick={handleUpload}>Upload Photo</button>  */}
            
        
      

   <Form upload={upload} setUpload={setUpload}/>
 <div className="profileContainer">
   

   { (myProfileData === "userDoesNotExist") ? (

     <ProfileComponentCreate />
   ) : (
    myProfile?.map((profile) =>(
      <ProfileComponent  profile={profile} edit={edit} myProfile={myProfile}/>

      ))
      )
      
    }
    
{/* 
{ (myProfile.length === 1) &&

   myProfile?.map((profile) =>(
      <ProfileComponent  profile={profile} edit={edit} myProfile={myProfile}/>

     
      ))       
} */}

      
      
      
   
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