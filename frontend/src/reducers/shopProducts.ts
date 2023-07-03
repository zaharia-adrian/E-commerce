import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../interfaces";


export interface ShopProductsState{
    products: Product[];
}
const initialShopProductsState:ShopProductsState = {
    products: [],
}

export default (state = initialShopProductsState, action: PayloadAction<any>) => {
    
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { products: [...action.payload], number: 1 };
        
        case 'CREATE_PRODUCT':
            return { products: [...state.products, action.payload.product],number:1 };
        
        case "DELETE_PRODUCT":
            return { products: state.products.filter((product: Product) => product?._id !== action.payload.productId), number: 1 };
        
        default:
            return state;
    }
}