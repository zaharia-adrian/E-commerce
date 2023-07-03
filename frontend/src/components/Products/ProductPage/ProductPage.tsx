import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../../../store/store";

import { addToCart } from "../../../actions/cart";
import { setError } from "../../../actions/error";
import { deleteProduct } from "../../../actions/userProducts";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import { AppState } from "../../../reducers";
import { Product } from "../../../interfaces";

import "./ProductPage.scss";

const ProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const products = useAppSelector((state: AppState) => state.shopProducts.products);
  const user = useAppSelector((state: AppState) => state.user);
  const { _id } = useParams();

  const product = products.find((item: Product) => item._id === _id);
  const myProduct: boolean = (product?.userId === user._id);


  const addToCartHandler = () => {
    if (user.isLoggedIn === false) {
      dispatch(setError("You must be logged in!"));
      navigate("/signin");
      return;
    }
    dispatch(addToCart(product?._id, user, navigate));
  };

  const deleteProductHandler = () => {
    dispatch(deleteProduct(product?._id, user,navigate));
  };

  const editProductHandler = () => {
    dispatch({ type: "SET_EDIT_PRODUCT", payload: product });
    navigate("/user/edit-product");
  };
 

  return (
    <div className="product-page">
      {/* <div className="product-page__images">
        <ArrowUpwardIcon
          fontSize="large"
          onClick={() => changeImageHandler(-1)}
        />
        <div>
          <div style={{ transform: `translateY(-${(imageIndex - 1) * 80}px)` }}>
            {product.images.map((image) => (
              <img
                className={`product-page__image `}
                src={image}
                alt={product.name}
              />
            ))}
          </div>
        </div>
        <ArrowDownwardIcon
          fontSize="large"
          onClick={() => changeImageHandler(1)}
        />
      </div> */}
      <div className="product-page__main-image">
        <img src={product?.image} alt={product?.name} />
      </div>
      <div className="product-page__info">
        {/* <div className="product-page__info-tags">
          {product.tags.map((tag) => (
            <p>{tag}</p>
          ))}
        </div> */}
        <h1 className="product-page__info-title">{product?.name}</h1>
        <h1 className="product-page__info-price">${product?.price}</h1>
        {/* <div className="product-page__info-colors">
          <p> color</p>
          <div className="product-page__info-colors-items">
            {product.colors.map((color) => (
              <span style={{ backgroundColor: color }}></span>
            ))}
          </div>
        </div> */}
        {/* <div className="product-page__info-size">
          <p>size</p>
          <div className="product-page__info-size-items">
            {product.sizes.map((size) => (
              <p>{size}</p>
            ))}
          </div>
        </div> */}
        {/* <div className="product-page__info-additional">
          <div className="product-page__info-additional-headers">
          <p>details</p>
          <p>brand</p>
          <p>care</p>
          <p>shiping</p>
          </div>
          <hr />
          <div className="product-page__info-additional-content">
          {product.details}
          </div>
        </div> */}
        <p>{product?.description}</p>
        <button onClick={addToCartHandler} className="full-button">Add to cart</button>
        {myProduct && (
          <>
            <button onClick={deleteProductHandler} className="full-button">delete</button>
            <button onClick={editProductHandler}>edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
