import * as api from "../api/index";

export const getShopProducts = () => async (dispatch: any) => {
  try {
    dispatch({ type: "SET_IS_LOADING" });

    const { data } = await api.getShopProducts();
    
    dispatch({ type: "GET_PRODUCTS", payload: data.products });
    dispatch({ type: "SET_IS_NOT_LOADING" });
  } catch (error: any) {
    dispatch({ type: "SET_IS_NOT_LOADING" }); 
    console.log(error.message);
  }
};


