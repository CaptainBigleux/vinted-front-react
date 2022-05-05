import React from "react";
import Navbar from "./Navbar";

import { Link } from "react-router-dom";

import logo from "../assets/img/logo.svg";

const Header = () => {
  return (
    <header>
      <div className="top-header">
        <Link to="/">
          <img src={logo} alt="vinted logo" />
        </Link>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
