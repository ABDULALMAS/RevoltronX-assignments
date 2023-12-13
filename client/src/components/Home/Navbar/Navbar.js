import React, { useState} from 'react'

import './styles.css'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MenuListComposition } from '../../Articles/Article/Article';
import { Button , Card} from '@material-ui/core';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

import notification from "../../../assets/Notification.svg";
import navAvatar from "../../../assets/navAvatar.png";
import arrowDown from "../../../assets/arrowDown.svg"
import useStyles from "./styles";


const Navbar = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
const classes = useStyles()



  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
    
  };

  const handleClose = (event) => {
    event.stopPropagation();

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleProfile = (event) => {
    event.stopPropagation();
    navigate("/myProfile")
   

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }



  const handleLogout = (event) => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
    // event.stopPropagation();

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  

  return (
    <>
    <div className='homeHeroNav'>
    <h1><strong> <a href='/edupoint'>Pro Edu</a></strong></h1>
    <ul>
        <li><a href='/edupoint'>Home</a></li>
        <li><a href='/articles'>Articles</a></li>
        
        <li><a href='/courses'>Courses</a></li>
        <li><a href='/videos'>Videos</a></li>
        <li><a href='/news'>News</a></li>
        
    </ul>

    {
      user ?(
        // <button className='homeHeroRegister' onClick={logout}> Log Out </button>
    

        <div className="navProfile">
        <img src={notification} className="notificationBell"/>

        <div className="navProfileDiv">
            <div className="navProfileAvatar">
              <img src={navAvatar}/>
            </div>
            <div className="navProfileText">
              <h3>Welcome back,</h3>
              <h2>{user?.result?.name}</h2>
            </div>

          
          {/* <div className={classes.overlay2} name="edit"> */}

            <Stack direction="row" spacing={2}>
      
        <Button
          ref={anchorRef}
          id="composition-button"
          style={{color: "white"}}
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
           <img src={arrowDown} className="arrowDown"/>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{height: "88px", zIndex: "10"}}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    style={{maxWidth: "118px", maxHeight: "88px" , display:"flex", flexDirection: "column", gap: "0px", marginTop: "0", padding: "8px"}}
                  >
                    <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      
    </Stack>
           </div>
           
         </div>
        
        //  </div>  
        
         
        ):(
          <Link to="/auth" style={{ textDecoration: 'none' }}>
    <button className='homeHeroRegister'> Register </button>
    </Link>
      
      )
    }
    
  </div>
    {/* <MenuListComposition /> */}
    </>

  )
}

export default Navbar
    