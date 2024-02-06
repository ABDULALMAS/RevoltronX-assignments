
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

    navigate("/edupoint");
    
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