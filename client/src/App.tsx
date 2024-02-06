/* eslint-disable */
import React, { useEffect, useState} from 'react';
import { ThemeProvider } from "@mui/material/styles";

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import './App.css';
import Home from './components/Home/Home';
import News from './components/News/News';
// import NavBar from './components/News/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
  
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from 'react-redux';

import Auth from './components/auth/Auth';
import Navbar from './components/Home/Navbar/Navbar';
import ArticleHome from './components/Articles/ArticleHome/ArticleHome';
import ArticleDetails from './components/Articles/ArticleDetails/ArticleDetails'
import MyProfile from './components/MyProfile/MyProfile';
import { getProfile } from './actions/profile';
import YoutubeVideos from './components/Videos/YoutubeVideo';
import Courses from './components/Courses/Courses';
import Form from './components/Articles/ArticleHome/Form';
import Footer from './components/Home/Footer/Footer';


function App() {

  let theme = createTheme();
theme = responsiveFontSizes(theme);
  // console.log(process.env.REACT_APP_BASE_URL)
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch<any>(getProfile());
    dispatch<any>(getUsers());
  },[dispatch]);
 
  return (
    <ThemeProvider theme={theme}>
    <GoogleOAuthProvider clientId="451541305632-fhfu6mpup3lgicouu3ufm9vr0apb55dm.apps.googleusercontent.com">
      <Router>
       <Navbar />
       
          
          <Routes>

          <Route
              path="/edupoint"
              element={ <Home /> }
            />
          <Route
              path="/"
              element={ <Home /> }
            />
          

          <Route
              path="/auth"
              element={ <Auth /> }
            />
          <Route
              path="/myProfile"
              element={ <MyProfile /> }
            />
          <Route
              path="/articles"
              element={ <ArticleHome /> }
            />
            <Route path="/articles/:id" element={<ArticleDetails />} />

            <Route path="/articles/search" element={<ArticleHome />} />
            <Route path="/articles/create" element={<Form />} />
            <Route path="/articles/edit/:articleId" element={<Form />} />


         
            <Route  path="/news" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>} />
          <Route  path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>} />
          <Route  path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>} />
          <Route  path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}/>
          <Route  path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}/>
          <Route  path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}/>
          <Route  path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
          <Route  path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}/>

        
          <Route
              path="/videos"
              element={ <YoutubeVideos   /> }
            />
          <Route
              path="/courses"
              element={ <Courses   /> }
            />
          <Route
              path="/articles/category/:selectedCategory"
              element={ <ArticleHome   /> }
            />
         

          
          </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
