import React from "react";
import Navbar from "./Navbar";

import { useState } from "react";
import { Link } from "react-router-dom";

import SignUp from "./SignUp";
import Login from "./Login";

import Cookies from "js-cookie";

import logo from "../assets/img/logo.svg";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("authenticated") || false
  );

  const [showModal, setShowModal] = useState("none");

  return (
    <>
      <header>
        <div className="top-header">
          <Link to="/">
            <img src={logo} alt="vinted logo" />
          </Link>
          <div className="top-header-input-holder">
            <span className="top-header-input-icon">🔍</span>
            <input
              className="top-header-input-search"
              placeholder="Recherche des articles"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
          {isLoggedIn ? (
            <button
              className="top-header-disconnect-btn"
              onClick={() => {
                Cookies.remove("authenticated");
                //string to bool === false which is what I want
                setIsLoggedIn((prevState) => !prevState);
              }}
            >
              Se Déconnecter
            </button>
          ) : (
            <>
              <button
                className="top-header-signup-btn"
                onClick={() => {
                  setShowModal("signup");
                }}
              >
                S'inscrire
              </button>
              <button
                className="top-header-login-btn"
                onClick={() => {
                  setShowModal("login");
                }}
              >
                Se connecter
              </button>
            </>
          )}
          <button className="top-header-sellnow-btn">Vends maintenant</button>
          <button className="top-header-info-btn">?</button>
          <select className="top-header-language-select">
            <option>FR</option>
          </select>
        </div>
        <Navbar />
      </header>
      {showModal === "none" ? null : showModal === "signup" ? (
        <SignUp setShowModal={setShowModal} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setShowModal={setShowModal} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
};

export default Header;
