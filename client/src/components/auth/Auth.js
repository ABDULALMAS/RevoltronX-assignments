/* eslint-disable */
import React, { useState } from "react";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";

import { ThemeProvider, createTheme} from "@mui/material/styles";


import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";



import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/Auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  let theme = createTheme();

  // const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (response) => {
 

    const token = response?.credential;
  
    const result = jwtDecode(token);
   console.log(result);
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/task");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = async () => {
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <Paper sx={{
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        
      }} elevation={3}>
        <Avatar sx={{
           margin: theme.spacing(1),
           backgroundColor: theme.palette.secondary.main,
        }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form  style={{
          width: "100%",
          marginTop: theme.spacing(3),
        }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2),
            }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            render={(renderProps) => (
              <Button
               sx={{
    marginBottom: theme.spacing(2),

               }}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </ThemeProvider>
  );
};

export default Auth;
