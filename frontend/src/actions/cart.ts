import * as api from "../api/index";


export const getCart = (user: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "SET_IS_LOADING" });

    const { data } = await api.getCart(user);

    dispatch({ type: "GET_CART", payload: data });
    dispatch({ type: "SET_IS_NOT_LOADING" });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const addToCart = (productId:any,user: any,navigate:any) => async (dispatch: any) => {
  try {
    dispatch({ type: "SET_IS_LOADING" });

    const product = { productId };
      
    const { data } = await api.addToCart(product, user);
    
    dispatch({ type: "GET_CART", payload: data });
    dispatch({ type: "SET_IS_NOT_LOADING" }); 

    navigate('/cart');
  } catch (error: any) {
    console.log(error.message);
     dispatch({ type: "SET_IS_NOT_LOADING" });
  }
};

export const removeFromCart = (productId: any, user: any,navigate:any) => async (dispatch: any) => {
  try {
    dispatch({ type: "SET_IS_LOADING" });

    const product = { productId };

    const { data } = await api.removeFromCart(product, user);

    dispatch({ type: "GET_CART", payload: data });
    dispatch({ type: "SET_IS_NOT_LOADING" });

    navigate("/cart");
  } catch (error: any) {
    console.log(error.message);
    dispatch({ type: "SET_IS_NOT_LOADING" });
  }
}
