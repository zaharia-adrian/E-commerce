import { Outlet } from "react-router-dom";

import Menu from "./Menu/Menu";

import "./Account.scss";

const Account = () => {
  return (
    <div className="account-wrapper">
      <Menu />
      <Outlet />
    </div>
  );
};

export default Account;
