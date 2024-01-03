
/* eslint-disable */

export interface ProfileState {
  userId?: string;

  _id? : number;
  photo: string;
  name: string;
  email: string;
  age: string;
  gender: string;
  DOB: string;
  phoneNumber: string;
}


const profilesReducer = (profiles: ProfileState[] = [], action: any) => {
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
};

export default profilesReducer;