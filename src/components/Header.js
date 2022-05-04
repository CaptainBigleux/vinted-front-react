import React from "react";
import Navbar from "./Navbar";

import logo from "../assets/img/logo.svg";

const Header = () => {
  return (
    <header>
      <div className="top-header">
        <img src={logo} alt="vinted logo" />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
