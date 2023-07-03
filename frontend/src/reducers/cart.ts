import { PayloadAction } from "@reduxjs/toolkit";
import { CartProduct } from "../interfaces";


const initialCartState:CartProduct[] = [];

export default (state = initialCartState, action: PayloadAction<any>) => {
  switch (action.type) {
    case "GET_CART":
      return action.payload.cart;
    default:
      return state;
  }
};
