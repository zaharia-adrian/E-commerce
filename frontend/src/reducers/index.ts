import { combineReducers } from "redux";


import cart from "./cart";
import user from "./user";
import loading from "./loading";
import shopProducts from "./shopProducts";
import userProducts from "./userProducts";
import error from './error';

import { UserState } from "./user";
import { ShopProductsState } from "./shopProducts";
import { UserProductsState } from "./userProducts";
import { CartProduct } from "../interfaces";

export interface AppState {
  cart: CartProduct[];
  user: UserState;
  loading: boolean;
  shopProducts: ShopProductsState;
  userProducts: UserProductsState;
  error: string;
}

export default combineReducers({
  cart,
  user,
  loading,
  userProducts,
  shopProducts,
  error
});
