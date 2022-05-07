import React from "react";
import Navbar from "./Navbar";

import { useState } from "react";
import { Link } from "react-router-dom";

import SignUp from "./SignUp";
import Login from "./Login";

import LabeledTwoThumbs from "./LabeledTwoThumbs";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import Cookies from "js-cookie";

import logo from "../assets/img/logo.svg";

const Header = ({
  sortByPrice,
  setSortByPrice,
  priceValues,
  setPriceValues,
  search,
  setSearch,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("authenticated") || false
  ); //get Cookie to know whether or not user is authenticated. If false then set state to false

  const [showModal, setShowModal] = useState("none"); // state to show modal. 3 "states". none = no modal. "signup" = signup modal. "login" = login modal.

  return (
    <>
      <header>
        <div className="top-header">
          <Link to="/">
            <img src={logo} alt="vinted logo" />
          </Link>
          <div className="top-header-input-search-and-filter">
            <div className="top-header-input-holder">
              <span className="top-header-input-icon">🔍</span>
              <input
                className="top-header-input-search"
                placeholder="Recherche des articles"
                value={search}
                onChange={(event) => {
                  {
                    /*search state is updated which create another axios request for filtering*/
                  }
                  setSearch(event.target.value);
                }}
              />
            </div>
            <div className="top-header-filter-holder">
              <div className="top-header-price-sort">
                <span>Trier par prix</span>
                <Toggle
                  onChange={() => {
                    {
                      /*check whether sort is currently asc or desc and sets it to the !choice. updates axios request.*/
                    }
                    const currentPriceSort =
                      sortByPrice === "price-asc" ? "price-desc" : "price-asc";
                    setSortByPrice(currentPriceSort);
                  }}
                />
              </div>
              <div className="top-header-price-filter-slider">
                {/*react-range slider. changing price values updates axios request*/}
                <LabeledTwoThumbs
                  priceValues={priceValues}
                  setPriceValues={setPriceValues}
                />
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <button
              className="top-header-disconnect-btn"
              onClick={() => {
                Cookies.remove("authenticated");
                //string to bool === false which is what I want. "authenticated" becomes false
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
      {/* here is where the modal appears if it is called */}
      {showModal === "none" ? null : showModal === "signup" ? (
        <SignUp setShowModal={setShowModal} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setShowModal={setShowModal} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
};

export default Header;
