import { PayloadAction } from '@reduxjs/toolkit';

const initialLoadingState:boolean = false;

export default (state = initialLoadingState, action: PayloadAction<any>) => {
  
  switch (action.type) {
      case "SET_IS_LOADING":
          return true;
      case "SET_IS_NOT_LOADING":
          return false;
    default:
      return state;
  }
};
