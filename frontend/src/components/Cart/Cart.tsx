import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store";

import { CartProduct } from "../../interfaces";

import CartItem from "./CartItem/CartItem";

import "./Cart.scss";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart);


  let totalPrice:number = 0;
  let totalQuantity:number = 0;

  if (cart && cart?.length > 0) {
    totalPrice = cart.reduce((price: number, product: CartProduct) => price + product.price * product.quantity,0);
    totalQuantity = cart.reduce((quantity: number, product: CartProduct) => quantity + product.quantity,0);
  };
  return (
    <div className="cart">
      {cart?.length > 0 ? (
        <div className="cart-items">
          {cart?.map((product: CartProduct) => (
            <CartItem product={product} />
          ))}
        </div>
      ) : (
        <p>No products in your cart</p>
      )}
      <div className="cart__summary">
        <h2>Total price: {totalPrice}$</h2>
        <h2>Total quantity: {totalQuantity} items</h2>
        {cart?.length > 0 && (
          <Link to="/cart/checkout">
            <button className="full-button">Checkout</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
