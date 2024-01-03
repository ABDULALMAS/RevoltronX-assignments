
import {
   
  CREATE,
  
  UPDATE,
  START_LOADING,
  END_LOADING,
 
  FETCH_ALL_PROFILES
} from "../constants/actionTypes.tsx";

import * as api from "../api/index.tsx";


interface ProfileState {
userId?: string;

_id? : number;
photo?: string;
name?: string;
email?: string;
age?: string;
gender?: string;
DOB?: string;
phoneNumber?: string;
}

export const getProfile = () => async (dispatch : any) => {
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






export const createProfile = (profile: ProfileState, navigate: any) => async (dispatch: any) => {
try {
  dispatch({ type: START_LOADING });

  const { data } = await api.createProfile(profile);
  dispatch({ type: CREATE, payload: data });
  navigate("/myProfile");

  dispatch({ type: END_LOADING });
} catch (error: any) {
  console.error("Create Profile Error:", error);

 
  if (error.response && error.response.status === 409) {
    
    console.error("Profile creation conflict:", error.response.data);
  } else {
    
    console.error("Unexpected error:", error.message);
  }
}
};


export const updateProfile = (id: number | undefined , profile: ProfileState, navigate : any) => async (dispatch :any) => {
  try {
    const { data } = await api.updateProfile(id, profile);

    dispatch({ type: UPDATE, payload: data });
    navigate("/myProfile");
  } catch (error) {
    console.log(error);
  }
};