import { PayloadAction } from "@reduxjs/toolkit";
export interface UserState{
  email: string;
  name: string;
  token: string;
  isLoggedIn: boolean;
  _id: string;
  isAdmin: boolean;
}
const initialUserState:UserState = {
  email: "",
  name: "",
  token: "",
  isLoggedIn: false,
  _id:"",
  isAdmin:false,
};

export default (state = initialUserState, action: PayloadAction<any>) => {
  switch (action.type) {
    case "SIGN_UP":
      return {
        email: action.payload.email,
        token: action.payload.token,
        name: action.payload.name,
        isAdmin: action.payload.isAdmin,
        _id: action.payload._id,
        isLoggedIn: true,
      };
    case "SIGN_IN":
      return {
        email: action.payload.email,
        token: action.payload.token,
        name: action.payload.name,
        isAdmin: action.payload.isAdmin,
        _id:action.payload._id,
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return initialUserState;  
    default:
      return state;
  }
};
