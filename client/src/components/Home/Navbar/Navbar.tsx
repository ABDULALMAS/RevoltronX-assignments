// /* eslint-disable */

import React, { useState , useEffect} from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import notification from '../../../assets/Notification.svg';
import navAvatar from '../../../assets/navAvatar.png';
import arrowDown from '../../../assets/arrowDown.svg';
import { useLocation } from "react-router-dom";


import {jwtDecode} from "jwt-decode";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')!));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);

  


  const handleLogout = (event?: React.MouseEvent<EventTarget> | undefined) => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
    setUser(null);
    if (anchorRef.current && anchorRef.current.contains(event?.target as Node)) {
      return;
    }
    setOpen(false);
  };


  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()) handleLogout(undefined)
    }

    setUser(JSON.parse(localStorage.getItem("profile")!));
  }, [location]);


  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleToggled = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpened((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) =>  {
    event.stopPropagation();
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const handleClosed = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation();
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpened(false);
    setToggle(!toggle);
  };

  const handleProfile = (event: React.MouseEvent<EventTarget>) => {
    event.stopPropagation();
    navigate('/myProfile');
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };


  const handleBookMark = (event: React.MouseEvent<EventTarget>) => {
    event.stopPropagation();
    navigate("/bookmarks");
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleTech = () => {
    navigate('/articles/category/Tech');
  };

  const handleBusiness = () => {
    navigate('/articles/category/Business');
  };

  const handleEntertainment = () => {
    navigate('/articles/category/Entertainment');
  };

  const handleSports = () => {
    navigate('/articles/category/Sports');
  };

  const handleLifestyle = () => {
    navigate('/articles/category/Lifestyle');
  };



  return (
    <>
      <div className='homeHeroNav'>
        <h1>
          <strong>
            {' '}
            <a href='/edupoint'>Pro Edu</a>
          </strong>
        </h1>
        <ul>
          <li>
            <a href='/edupoint'>Home</a>
          </li>

          <div className='articlesDropDown'>
            <li>
              <a href='/articles'>Articles</a>
            </li>
            <Stack direction='row' spacing={2}>
              <Button
                ref={anchorRef}
                id='composition-button'
                style={{ color: 'white', background: 'transparent' }}
                aria-controls={opened ? 'composition-menu' : undefined}
                aria-expanded={opened ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleToggled}
              >
                {toggle ? (
                  <ArrowDropUpIcon
                    style={{
                      color: 'black',
                      paddingInline: '0px',
                      margin: '0px',
                      position: 'absolute',
                      right: '40px',
                      background: 'transparent',
                    }}
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      color: 'black',
                      paddingInline: '0px',
                      margin: '0px',
                      position: 'absolute',
                      right: '40px',
                      background: 'transparent',
                    }}
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  />
                )}
              </Button>
              <Popper
                open={opened}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom-start'
                transition
                disablePortal
                style={{ height: '88px', zIndex: '10' }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper
                      sx={{
                        position: 'absolute',
                        top: '0',
                        right: '700px',
                      }}
                    >
                    <ClickAwayListener onClickAway={(event: MouseEvent | TouchEvent) => handleClosed(event)}>

                        <MenuList
                          autoFocusItem={opened}
                          id='composition-menu'
                          aria-labelledby='composition-button'
                          onKeyDown={handleListKeyDown}
                          style={{
                            maxWidth: '150px',
                            maxHeight: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0px',
                            marginTop: '0',
                            padding: '8px',
                          }}
                        >
                          <MenuItem style={{ cursor: 'text', backgroundColor: '#D3D3D3' }}>
                            Select Category
                          </MenuItem>
                          <MenuItem onClick={handleTech} value='tech' >
                            Tech
                          </MenuItem>
                          <MenuItem onClick={handleBusiness}>Business</MenuItem>
                          <MenuItem onClick={handleEntertainment}>Entertainment</MenuItem>
                          <MenuItem onClick={handleSports}>Sports</MenuItem>
                          <MenuItem onClick={handleLifestyle}>Lifestyle</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Stack>
          </div>
          <li>
            <a href='/courses'>Courses</a>
          </li>
          <li>
            <a href='/videos'>Videos</a>
          </li>
          <li>
            <a href='/news'>News</a>
          </li>
        </ul>

        
        { user ? (
          <div className='navProfile'>
            <img src={notification} alt='img' className='notificationBell' />

            <div className='navProfileDiv'>
              <div className='navProfileAvatar'>
                <img src={navAvatar} alt='img' />
              </div>
              <div className='navProfileText'>
                <h3>Welcome back,</h3>
                <h2>{user?.result?.name}</h2>
              </div>

              <Stack direction='row' spacing={2}>
                <Button
                  ref={anchorRef}
                  id='composition-button'
                  style={{ color: 'white' }}
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup='true'
                  onClick={handleToggle}
                >
                  <img src={arrowDown} alt='img' className='arrowDown' />
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement='bottom-start'
                  transition
                  disablePortal
                  style={{ height: '88px', zIndex: '10' }}
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
                      <ClickAwayListener onClickAway={(event: MouseEvent | TouchEvent) => handleClose(event)}>
                          <MenuList
                            autoFocusItem={open}
                            id='composition-menu'
                            aria-labelledby='composition-button'
                            onKeyDown={handleListKeyDown}
                            style={{
                              maxWidth: '150px',
                              maxHeight: '150px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0px',
                              marginTop: '0',
                              padding: '8px',
                            }}
                          >
                            <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                            <MenuItem onClick={handleBookMark}>My BookMarks</MenuItem>
                            {
                              
                              (user?.result?.role === "administrator" || user?.result?.role === "approver") &&(
                                <Link to="/admin/dashboard" style={{textDecoration: "none", color: "inherit"}} onClick={() =>setOpen(false)}>
                            <MenuItem >Dashboard</MenuItem>
                              </Link>
                                
                                )
                              }
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
        ) : (
          <Link to='/auth' style={{ textDecoration: 'none', marginTop: '40px' }}>
            <button className='homeHeroRegister'> Register </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
    