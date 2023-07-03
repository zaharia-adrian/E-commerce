import axios from "axios";

const url = "http://localhost:5000/api";

///products
export const getShopProducts = () => axios.get(`${url}/products`);

///user
export const signUp = (user: any) => axios.post(`${url}/signup`, user);

export const signIn = (user: any) => axios.post(`${url}/signin`, user);

export const editProfile = (editProfileData: any, user: any) => axios.post(`${url}/user/edit-profile`,{
    headers: { Authorization: `Bearer ${user.token}` },
  });

///cart
export const getCart = (user: any) =>
  axios.get(`${url}/cart`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });

export const addToCart = (product: any, user: any) =>
  axios.post(`${url}/cart/add-to-cart`, product, {
    headers: { Authorization: `Bearer ${user.token}` },
  });

export const removeFromCart = (product: any, user: any) =>
  axios.post(`${url}/cart/remove-from-cart`, product, {
    headers: { Authorization: `Bearer ${user.token}` },
  });

///profile
export const getUserProducts = (user: any) =>
  axios.get(`${url}/user-products`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });

export const deleteProduct = (productId: any, user: any) =>
  axios.delete(`${url}/delete-product/${productId}`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });

export const editYourProduct = (product: any, productId: any, user: any) =>
  axios.patch(
    `${url}/edit-product/${productId}`,
    { product },
    {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  );

export const createProduct = (product: any, user: any) =>
  axios.post(`${url}/create-product`, product, {
    headers: {
      Authorization: `Bearer ${user.token}`,
      // "Content-Type": "multipart/form-data",
    },
  });
