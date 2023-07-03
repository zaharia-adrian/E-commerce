import React, { FunctionComponent } from "react";
import { NavLink as Link } from "react-router-dom";
import { useAppSelector } from "../../../store/store";


import "./NavLinks.scss";

const NavLinks: FunctionComponent = () => {

  const user = useAppSelector((state) => state.user);
  const userExists = user.isLoggedIn;
  const userIsAdmin = user.isAdmin;

  return (
    <ul className="nav-links">
      <li><Link to='/products'>Shop</Link></li>
      <li><Link to='/about'>About</Link></li> 
    </ul>
  );
};

export default NavLinks;
