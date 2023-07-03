import * as api from "../api/index";

export const getUserProducts = (user: any) => async (dispatch: any) => {
  try {
    dispatch({ type: "SET_IS_LOADING" });

    const { data } = await api.getUserProducts(user);

    
    dispatch({ type: "GET_USER_PRODUCTS", payload: data.products });
    dispatch({ type: "SET_IS_NOT_LOADING" });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createProduct =
  (product: any, user: any, navigate: any) => async (dispatch: any) => {
    try {
      dispatch({ type: "SET_IS_LOADING" });

      // product = { ...product, user: user };
      // let formData = new FormData();
      // formData.append("image", product.image);
      // formData.append("product", JSON.stringify(product));

      console.log(product);
      
      const { data } = await api.createProduct(product, user);

      // dispatch({ type: "CREATE_PRODUCT", payload: data });
      // dispatch({ type: "CREATE_YOUR_PRODUCT", payload: data });
      dispatch({ type: "SET_IS_NOT_LOADING" });

      navigate("/user/manage-products");
    } catch (error: any) {
      console.log(error.message);
    }
  };


export const deleteProduct =
  (productId: any, user: any, navigate :any) => async (dispatch: any) => {
    try {
      dispatch({ type: "SET_IS_LOADING" });

      const { data } = await api.deleteProduct(productId, user);

      dispatch({ type: "DELETE_PRODUCT", payload: { productId } });
      dispatch({ type: "SET_IS_NOT_LOADING" });
      navigate("/user/manage-products");
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const editProduct =
  (product: any,productId:any, user: any, navigate: any) => async (dispatch: any) => {
    try {
      dispatch({ type: "SET_IS_LOADING" });

      console.log(user);
      
      const { data } = await api.editYourProduct(product, productId, user);
      console.log(data);
      
      
      dispatch({ type: "EDIT_PRODUCT", payload: { productId, product: data } });
      dispatch({ type: "SET_NOT_EDIT_PRODUCT" });
      
      dispatch({ type: "SET_IS_NOT_LOADING" });
      navigate("/user/manage-products");
      
    } catch (error: any) {
      dispatch({ type: "SET_IS_NOT_LOADING" }); 
      dispatch({ type: "SET_NOT_EDIT_PRODUCT" });
      navigate("/user/manage-products");
      console.log(error.message);
    }
  };
