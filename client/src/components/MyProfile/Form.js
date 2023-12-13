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
    
import FileBase from "react-file-base64";

import "./styles.css";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile , updateProfile} from '../../actions/profile';


const Form = ({edit, setEdit, currentId, setCurrentId, upload, setUpload}) => {
    const user = JSON.parse(localStorage.getItem("profile"));

    const post = useSelector((state) =>
    currentId
      ? state.profiles.find((message) => message._id === currentId)
      : null
  );

console.log(currentId)
  useEffect(() => {
    if (post) setProfileData(post);
  }, [post]);

    // const [upload , setUpload] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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


    const clear = () => {
        setCurrentId(0);
        setProfileData({photo: "",
        name: "",
        email: "",
        age: "",
        gender: "",
        DOB: "",
        phoneNumber: "" });
        setEdit(false)
      };

    const handleSubmit = (e) => {
        e.preventDefault();
  
        
  
        if(currentId === 0) {
  
          dispatch(createProfile({ ...profileData , userId : user?.result?._id, navigate}));
          setEdit(false);
          setUpload(false);
          // clear()
        }
       else{
        dispatch(updateProfile(currentId, { ...profileData, navigate}));
        setEdit(false);
          setUpload(false);
          clear()
       }
  
      }
  return (
    <>
    <Dialog open={edit}>
        
      <Paper className={classes.paper}>
          <form  autoComplete="off"
  noValidate
  className={`${classes.root} ${classes.form}`}
  onSubmit={handleSubmit}>
          <Typography variant="h6">
        Editing Profile
  </Typography>
         
         <TextField
         className={classes.TextField} 
         name='name'
         variant="outlined"
         label="Your Name"
         fullWidth
         value={profileData.name}
         onChange={(e) => setProfileData({ ...profileData, name: e.target.value})}
         />
         <TextField 
          className={classes.TextField} 
         name='email'
         variant="outlined"
         label="Your Email"
         fullWidth
         value={profileData.email}
         onChange={(e) => setProfileData({ ...profileData, email: e.target.value})}
         />
       
         <TextField 
          className={classes.TextField} 
         name='age'
         variant="outlined"
         label="Your Age"
         fullWidth
         value={profileData.age}
         onChange={(e) => setProfileData({ ...profileData, age: e.target.value})}
         />
         <TextField 
          className={classes.TextField} 
          select
         name='gender'
         variant="outlined"
         label="Your Gender"
         fullWidth
         value={profileData.gender}
         onChange={(e) => setProfileData({ ...profileData, gender: e.target.value})}
         >
          <MenuItem value="male">Male </MenuItem>
          <MenuItem value="female">Female</MenuItem>
          </TextField>

          <TextField 
          type='date'
          className={classes.TextField} 
         name='DOB'
         variant="outlined"
         label="Date Of Birth"
         fullWidth
         value={profileData.DOB}
         onChange={(e) => setProfileData({ ...profileData, DOB: e.target.value})}
         InputLabelProps={{ shrink: true }}
         />

<TextField 
          className={classes.TextField} 
         name='phoneNumber'
         variant="outlined"
         label="Phone Number"
         fullWidth
         value={profileData.phoneNumber}
         onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value})}
         />


<Button
    className={classes.buttonSubmit}
    variant="contained"
    color="primary"
    size="large"
    type="submit"
    fullWidth
  >
    Submit
  </Button>
  <Button
    variant="contained"
    color="secondary"
    size="small"
    onClick={clear}
    fullWidth
  >
    Clear
  </Button>
          </form>
      </Paper>
  
</Dialog>


<Dialog 
            open={upload}
            backdropStyle={{ backgroundColor: 'lightpink' }}
            >
           <Container className={classes.container}>
            <Paper className='paper'>
                <form 
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}>
            <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setProfileData({ ...profileData, photo: base64 })
            }
          />
          <Button
          className={classes.photoSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          
        >
          Submit
        </Button>
          </form>
            </Paper>
           </Container>
           </Dialog>
</>
  )
}

export default Form