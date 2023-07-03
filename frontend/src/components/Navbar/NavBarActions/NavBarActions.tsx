import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/store";



import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


import "./NavBarActions.scss";
import { CartProduct } from "../../../interfaces";
const NavBarActions = () => {
  

  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);

  const userExists = user.isLoggedIn;

  let cartNumber = 0;
  if (cart?.length > 0) {
    cartNumber = cart.reduce((quantity: number, product: CartProduct) => quantity + product.quantity, 0);
  }
  

  return (
    <div className="navbar-actions">
      
      {!userExists && (
        <>
          <Link to="/signin">
            <button>Log in</button>
          </Link>
          <Link to="/signup">
            <button className="full-button" style={{marginLeft:"5px"}}>Sign up</button>
          </Link>
        </>
      )}
      {userExists && (
          <b style={{ fontSize: "1.2rem" }}>{user.name}</b>
      )}
      {userExists && (
        <>
          <Link to="/user/edit-profile" style={{ color: "white" }}>
            <PersonIcon fontSize="large" />
          </Link>
          <Link to="/cart" style={{ color: "white" }}>
            <div className="cart-container">
              <ShoppingCartIcon fontSize="large" />
              {cartNumber > 0 && (
                <div className="cart-number">
                  <span>{cartNumber}</span>
                </div>
              )}
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBarActions;
