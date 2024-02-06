
import * as api from "../api/index.tsx";


interface FormState {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const signin = (formData: FormState, navigate: any) => async (dispatch : any) => {
  try {
    const { data } = await api.signIn(formData);
  

    dispatch({ type: "AUTH", data });
 
   
 
    navigate("/");
  
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData: FormState, navigate: any) => async (dispatch : any) => {
  try {
    const { data } = await api.signUp(formData);
   

    dispatch({ type: "AUTH", data });

    navigate("/edupoint");
    
  } catch (error) {
    console.log(error);
  }
};
export const getUsers = () => async (dispatch : any) => {
  try {
    const { data } = await api.getUsers();
   
  // console.log(data)
    dispatch({ type: "FETCH_USERS",  payload : data });

    
    
  } catch (error: any) {
    console.error("Create Profile Error:", error);

   
    if (error.response && error.response.status === 404) {
      
      console.error("Profile creation conflict:", error.response.data);
    } else {
      
      console.error("Unexpected error:", error.message);
    }
  }
};

export const updateUserRole = (id: string , payload:{role: string}, navigate: any) => async (dispatch: any) => {
try {
  const { data } = await api.updateUserRoleAPI(id,payload.role)
  console.log("payloadRole",data)
  dispatch({type: "UPDATE_USER_ROLE", payload: data.user})
  navigate("/admin/dashboard")
} catch (error) {
  console.log(error);
}
}

