import { PayloadAction } from "@reduxjs/toolkit";

const initialErrorState: string = "";

export default (state = initialErrorState, action: PayloadAction<any>) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.payload;
    case "DELETE_ERROR":
      return "";
    default:    
      return state;
  }
};
