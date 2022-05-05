import React from "react";
import { useState } from "react";

import Cookies from "js-cookie";

import axios from "axios";

const Login = ({ setShowModal, setIsLoggedIn }) => {
  //    {
  //   "email": "johndoe@lereacteur.io",
  //   "username": "JohnDoe",
  //   "password": "azerty",
  //   "newsletter": true
  // }

  //to prevent scrolling on modal
  //does not prevent scroll on mobile
  document.body.style.overflow = "hidden";

  const [loginObject, setLoginObject] = useState({});

  // try to sign up
  const tryLogin = async () => {
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/user/login",
      loginObject
    );
    setIsLoggedIn(Cookies.set("authenticated", response.data.token));
    setShowModal("none");
  };

  const buildRequestObject = (key, keyValue) => {
    const objCopy = { ...loginObject };
    objCopy[key] = keyValue;
    setLoginObject(objCopy);
  };

  return (
    <div className="login-modal">
      <div
        className="login-bg"
        onClick={() => {
          setShowModal("none");
        }}
      ></div>
      <div className="login-popup">
        <h3>Se connecter</h3>
        <div className="login-holder">
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              buildRequestObject("email", event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              buildRequestObject("password", event.target.value);
            }}
          />

          <button
            className="login-btn"
            onClick={() => {
              tryLogin();
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
