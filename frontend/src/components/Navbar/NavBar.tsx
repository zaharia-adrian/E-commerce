import React, { FunctionComponent } from "react";

import NavLinks from "./NavBarLinks/NavLinks";
import NavBarActions from "./NavBarActions/NavBarActions";
import Logo from "./Logo/Logo";

import SearchIcon from "@mui/icons-material/Search";

import './NavBar.scss';
const Navbar: FunctionComponent = (props) => {
  return (
    <div className="navbar">
      <Logo />
      {/* <div style={{display:"flex"}}>
      <SearchIcon fontSize="large" />
      <input
        style={{
          background: "transparent",
          outline: "none",
          border: "1px solid grey",
          padding: "5px",
          borderRadius: "50px",
        }}
      />
      </div> */}
      {/* <NavLinks /> */}
      <NavBarActions />
    </div>
  );
};

export default Navbar;
