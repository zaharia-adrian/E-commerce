import React, { FC, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/store";

import { getShopProducts } from "./actions/shopProducts";
import { getUserProducts } from "./actions/userProducts";
import { signInOnStart } from "./actions/user";
import { getCart } from "./actions/cart";
import { AppState } from "./reducers";

import { User } from "./interfaces";

import Navbar from "./components/Navbar/NavBar";
import Home from "./components/Home/Home";
import ProductPage from "./components/Products/ProductPage/ProductPage";
import ProductEditor from "./components/Account/ProductEditor/ProductEditor";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import PageNotFound from "./components/404/PageNotFound";
import SignUp from "./components/Authentication/SignUp/SignUp";
import SignIn from "./components/Authentication/SingIn/SignIn";
import UserProducts from "./components/Account/UserProducts/UserProducts";
import Account from "./components/Account/Account";
import EditProfile from "./components/Account/EditProfile/EditProfile";
import About from "./components/About/About";
import Checkout from "./components/Cart/Checkout/Checkout";
import Loading from "./components/Loading/Loading";

import "./App.scss";

const App: FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: AppState) => state.user);
  const isLoading = useAppSelector((state: AppState) => state.loading);
  const error = useAppSelector((state: AppState) => state.error);

  useEffect(() => {
    dispatch(getShopProducts());

    const userString = localStorage.getItem("user");
    let user: User | null = null;
    if (userString) {
      try {
        user = JSON.parse(userString) as User;
      } catch (error) {
        console.log(error);
      }
    }

    if (user) {
      dispatch(signInOnStart(user));
      dispatch(getCart(user));
      if (user.isAdmin) {
        dispatch(getUserProducts(user));
      }
    }
  }, []);

  const userExists = user.isLoggedIn;
  const userIsAdmin = user.isAdmin;

  return (
    <div className="app_wrapper">
      <Navbar />
      {isLoading ? (
        <div className="loading">
          <Loading/>
        </div>
      ) : null}
      <div className="app">
        <Routes>
          <Route path="/products/:_id" element={<ProductPage />} />

          {!userExists && (
            <>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          )}

          {userExists && (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/checkout" element={<Checkout />} />
              <Route path="/user" element={<Account />}>
                <Route path="edit-profile" element={<EditProfile />} />
                {userIsAdmin && (
                  <>
                    <Route
                      path="create-product"
                      element={<ProductEditor isEditingProduct product />}
                    />
                    <Route path="manage-products" element={<UserProducts />} />
                    <Route
                      path="edit-product"
                      element={<ProductEditor isEditingProduct product />}
                    />
                  </>
                )}
              </Route>
            </>
          )}

          <Route path="/about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      {error.length > 0 && <div className="error"> {error} </div>}
    </div>
  );
};

export default App;
