/* eslint-disable */
import React,{ useState, useEffect} from 'react'
import { ThemeProvider, createTheme} from '@mui/material/styles'

import {
    
    Button,
    Paper,
   
    Typography,
    Container,
    TextField,
    Dialog,
    MenuItem,
} from "@mui/material";
    
import FileBase from "react-file-base64";

import "./styles.css";

// import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProfile , updateProfile} from '../../actions/profile';



const Form = ({edit, setEdit, currentId, setCurrentId, upload, setUpload}) => {
  let theme = createTheme();

    const user = JSON.parse(localStorage.getItem("profile"));

    const post = useSelector((state) =>
    currentId
      ? state.profiles.find((message) => message._id === currentId)
      : null
  );

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
    // const classes = useStyles();


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
    <ThemeProvider theme={theme}>
    <Dialog open={edit}>
        
      <Paper sx={{display: "flex",
  padding: theme.spacing(2),}}>
          <form  autoComplete="off"
  noValidate
 style={{  display: "flex",
 flexWrap: "wrap",
 justifyContent: "center",
 margin: theme.spacing(1),}}
  onSubmit={handleSubmit}>
          <Typography variant="h6" sx={{margin: theme.spacing(1)}}>
        Editing Profile
  </Typography>
         
         <TextField
         sx={{marginBottom: "10px"}} 
         name='name'
         variant="outlined"
         label="Your Name"
         fullWidth
         value={profileData.name}
         onChange={(e) => setProfileData({ ...profileData, name: e.target.value})}
         />
         <TextField 
           sx={{marginBottom: "10px"}}
         name='email'
         variant="outlined"
         label="Your Email"
         fullWidth
         value={profileData.email}
         onChange={(e) => setProfileData({ ...profileData, email: e.target.value})}
         />
       
         <TextField 
           sx={{marginBottom: "10px"}} 
         name='age'
         variant="outlined"
         label="Your Age"
         fullWidth
         value={profileData.age}
         onChange={(e) => setProfileData({ ...profileData, age: e.target.value})}
         />
         <TextField 
         sx={{marginBottom: "10px"}}
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
          sx={{marginBottom: "10px"}}
         name='DOB'
         variant="outlined"
         label="Date Of Birth"
         fullWidth
         value={profileData.DOB}
         onChange={(e) => setProfileData({ ...profileData, DOB: e.target.value})}
         InputLabelProps={{ shrink: true }}
         />

<TextField 
          sx={{marginBottom: "10px"}}
         name='phoneNumber'
         variant="outlined"
         label="Phone Number"
         fullWidth
         value={profileData.phoneNumber}
         onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value})}
         />


<Button
    sx={{
      marginBottom: "10px",
    }}
    variant="contained"
    color="primary"
    size="large"
    type="submit"
    fullWidth
  >
    Submit
  </Button>
  <Button
  sx={{
    height: "40px",
  }}
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
           <Container sx={{
             margin: "10px",
             display: "flex",
           width: "300px",
           height: "50px",
           justifyContent: "center",
           alignItems: "center",
           }}>
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
         sx={{
          margin: "10px",
          width: "50px",
          height: "20px",
         }}
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
           </ThemeProvider>
</>
  )
}

export default Form