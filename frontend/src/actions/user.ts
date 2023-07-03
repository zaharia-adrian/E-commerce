import { Dispatch } from "redux";
import * as api from "../api/index";

export const signUp = (user: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "SET_IS_LOADING" });

    const { data } = await api.signUp(user);

    localStorage.setItem('user', JSON.stringify(data));

    dispatch({ type: "SIGN_UP", payload: data });
    dispatch({ type: "SET_IS_NOT_LOADING" });
  } catch (error: any) {
    dispatch({ type: "SET_IS_NOT_LOADING" }); 
    console.log(error.message);
  }
};

export const signIn = (user: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "SET_IS_LOADING" });

    const { data } = await api.signIn(user);

    localStorage.setItem("user", JSON.stringify(data));

    dispatch({ type: "SIGN_IN", payload: data });
    dispatch({ type: "SET_IS_NOT_LOADING" });
  } catch (error: any) {
    dispatch({ type: "SET_IS_NOT_LOADING" }); 
    console.log(error.message);
  }
}

export const signInOnStart = (user: any) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch({ type: "SIGN_IN", payload: user });    
  } catch (error: any) {
    console.log(error.message);
  }
}

export const logOut = (navigate:any) => async (dispatch: Dispatch<any>) => {
  try {
    localStorage.removeItem('user');
    dispatch({ type: "LOG_OUT" });
    navigate('/');
  } catch (error:any) {
    console.log(error.message);
  }
}

export const editProfile = (editProfileData:any,user:any) => async (dispatch: Dispatch<any>) => {
  try {
    const { data } = await api.editProfile(editProfileData,user);
  } catch (error:any) {
    console.log(error.message);
    
  }
}
