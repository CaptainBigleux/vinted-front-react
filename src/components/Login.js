import React from "react";
import { useState } from "react";

import { validateEmail, validatePassword } from "../HelperFunctions";

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
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  // try to sign up
  const tryLogin = async () => {
    const checkEmail = validateEmail(loginObject.email);
    checkEmail === true ? setInvalidEmail(false) : setInvalidEmail(true);

    const checkPassword = validatePassword(loginObject.password);
    checkPassword ? setInvalidPassword(false) : setInvalidPassword(true);

    if (checkPassword && checkEmail) {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        loginObject
      );
      setIsLoggedIn(Cookies.set("authenticated", response.data.token));
      setShowModal("none");
    }
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
          document.body.style.overflow = "scroll";

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
          <div className="error-messages">
            {invalidEmail ? <p>Email non valide. Veuillez réessayer.</p> : null}
            {invalidPassword ? (
              <p>
                Votre mot de passe doit contenir une majuscule, une minuscle, un
                chiffre ainsi qu'un caractère spécial.
              </p>
            ) : null}
          </div>
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
