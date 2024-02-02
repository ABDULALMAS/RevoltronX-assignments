<<<<<<< HEAD
/* eslint-disable */

export interface AuthState {
  authData: AuthData  | null  | undefined;
}
=======
import { act } from "react-dom/test-utils"


>>>>>>> role-based-access-control

interface AuthAction {
  type: string;
  data?: AuthData;
}

<<<<<<< HEAD
interface AuthData {
 
  id: string;
  name: string;

}

const authReducer = (state: AuthState = { authData: null }, action: AuthAction): AuthState => {

  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, authData: null };
=======
 export interface AuthData {
  users: {

    _id: string;
    name: string;
    email?: string;
    role?: string;
    token?: string
  }[]

   
  }
     
     
    


// const authReducer = (state: AuthData[] = [], action: any) => {
const authReducer = (state: AuthData = { users: [] }, action: any) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return action?.data || state// Add the new user to the existing array
    case "LOGOUT":
      localStorage.clear();
      return []; // Clear the array on logout
    case "FETCH_USERS":
      return {
        ...state,
        users : action.payload
      }
    
     case "UPDATE_USER_ROLE":
      console.log("users",state.users)
       return { 
        ...state, 
        users: state.users.map((user) => 
        (user._id === action.payload._id ? { ...user, role: action.payload.role } : user))}
        
>>>>>>> role-based-access-control
    default:
      return state;
  }
};

export default authReducer;