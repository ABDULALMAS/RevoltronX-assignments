// import {
//     FETCH_ALL,
//     FETCH_POST,
//     FETCH_ALLPROFILES,
//     DELETE,
//     UPDATE,
//     CREATE,
//     FETCH_BY_SEARCH,
//     START_LOADING,
//     END_LOADING,
//     COMMENT,

//   } from "../constants/actionTypes";



//   export default (state = { isLoading: true, profiles: [] }, action) => {
//     switch (action.type) {

//         case START_LOADING:
//             return { ...state, isLoading: true };
//           case END_LOADING:
//             return { ...state, isLoading: false };
//         case "FETCH_ALLPROFILES":
//           return {
//             ...state,
//             profiles: action.payload.data,
       
//           };
//         case UPDATE:

//         return{
//           ...state,
//            profiles :state.profiles.map((profile) => 
//           profile._id === action.payload._id ? action.payload : profile
//           )
//         }
//         case CREATE:
//                    return { ...state, profiles: [...state.profiles, action.payload] };


        
    
//         default:
//             return state;
//     }
// };
/* eslint-disable */

export default (profiles = [], action) => {
  switch (action.type) {
      case "FETCH_ALL_PROFILES":
      return action.payload;
      case "UPDATE":
      return profiles.map((profile) => 
      profile._id === action.payload._id ? action.payload : profile
      );
      case "CREATE":
          return [...profiles, action.payload];

      
  
      default:
          return profiles;
  }
}