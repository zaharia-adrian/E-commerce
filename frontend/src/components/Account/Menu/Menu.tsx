import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { NavLink as Link } from "react-router-dom";

import { logOut } from "../../../actions/user";

import LogoutIcon from "@mui/icons-material/Logout";

import "./Menu.scss";
const Menu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  const userExists = user.isLoggedIn;
  const userIsAdmin = user.isAdmin;

  const logOutHandler = () => {
    dispatch(logOut(navigate));
  };

  return (
    <div className="menu">
      <Link
        to="/user/edit-profile"
        className={({ isActive }) => (isActive)?" menu-link menu-link-active":"menu-link"}
      >
        <h1>Edit profile</h1>
      </Link>
      {userExists && userIsAdmin ? (
        <>
          <Link
            to="/user/manage-products"
            className={({ isActive }) => (isActive)?" menu-link menu-link-active":"menu-link"}
          >
            <h1>Your products</h1>
          </Link>
          <Link
            to="/user/create-product"
            className={({ isActive }) => (isActive)?" menu-link menu-link-active":"menu-link"}
          >
            <h1>Create product</h1>
          </Link>
        </>
      ) : null}
      <LogoutIcon onClick={logOutHandler} fontSize="large"  className="logout-icon"/>
    </div>
  );
};

export default Menu;
