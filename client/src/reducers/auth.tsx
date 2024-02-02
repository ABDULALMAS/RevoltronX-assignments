/* eslint-disable */

export interface AuthState {
  authData: AuthData  | null  | undefined;
}

interface AuthAction {
  type: string;
  data?: AuthData;
}

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
    default:
      return state;
  }
};

export default authReducer;