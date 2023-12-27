
import {
   
    CREATE,
    
    UPDATE,
    START_LOADING,
    END_LOADING,
   
    FETCH_ALL_PROFILES
  } from "../constants/actionTypes.js";

import * as api from "../api/index.js";

export const getProfile = () => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchProfile();
    // console.log(data)
      dispatch({ type: FETCH_ALL_PROFILES, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };


export const createProfile = (profile, navigate) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.createProfile(profile);
      dispatch({ type: CREATE, payload: data });
      navigate("/myProfile");
  
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

  export const updateProfile = (id, profile, navigate) => async (dispatch) => {
    try {
      const { data } = await api.updateProfile(id, profile);
  
      dispatch({ type: UPDATE, payload: data });
      navigate("/myProfile");
    } catch (error) {
      console.log(error);
    }
  };