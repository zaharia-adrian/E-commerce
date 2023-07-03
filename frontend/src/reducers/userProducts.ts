import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interfaces";

export interface UserProductsState {
  products: Product[];
  editingProduct: {
    product: Product,
    isEditing: boolean,
    _id:string,
  }
}

const initialUserProductsState = {
  products: [],
  editingProduct: {
    product: {},
    isEditing: false,
    _id: "",
  },
};

export default (state = initialUserProductsState, action: any) => {
  switch (action.type) {
    case "GET_USER_PRODUCTS":
      return {
        ...state,
        products: [...action.payload],
      };

    case "CREATE_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload.product],
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product: Product) => product?._id !== action.payload.productId
        ),
      };

    case "SET_EDIT_PRODUCT":
      const id = action.payload._id;
      delete action.payload._id;
      return {
        ...state,
        editingProduct: {
          product: action.payload,
          isEditing: true,
          _id: id,
        },
      };
    case "SET_NOT_EDIT_PRODUCT":
      return {
        ...state,
        editingProduct: {
          product: {},
          isEditing: false,
          _id: "",
        },
      };
    default:
      return state;
  }
};
