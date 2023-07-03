import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../../../store/store";

import { CartProduct } from "../../../interfaces";

import { addToCart, removeFromCart } from "../../../actions/cart";

import "./CartItem.scss";

interface cartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: cartItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  return (
    <Link to={`/products/${product.productId}`} style={{color:"white",textDecoration:"none"}}>
      <div className="cart-item">
        <div className="cart-item__image">
          <img src={product.image} />
        </div>
        <div className="cart-item__content">
          <div className="cart-item__content-left">
            <h1>{product.name}</h1>
          </div>
          <div className="cart-item__content-right">
            <h3>
              ${product.price * product.quantity} (${product.price})
            </h3>
            <div className="cart-item__content-right-actions">
              <button
                onClick={() =>
                  dispatch(removeFromCart(product.productId, user, navigate))
                }
                className="cart-item-quantity-button"
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                onClick={() =>
                  dispatch(addToCart(product.productId, user, navigate))
                }
                className="cart-item-quantity-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CartItem;
