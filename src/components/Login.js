import React from "react";
import { useState } from "react";

import { validateEmail, validatePassword } from "../HelperFunctions";

import Cookies from "js-cookie";

import axios from "axios";

//very similar to signup
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

  const [loginObject, setLoginObject] = useState({}); //state with object to send to the post request. could also have created multiple states for each input field
  const [invalidPassword, setInvalidPassword] = useState(false); // used for password validation
  const [invalidEmail, setInvalidEmail] = useState(false); // used for email validation

  // try to sign up
  const tryLogin = async () => {
    //check if email is valid.
    const checkEmail = validateEmail(loginObject.email);
    checkEmail === true ? setInvalidEmail(false) : setInvalidEmail(true);

    //check if password is valid.
    const checkPassword = validatePassword(loginObject.password);
    checkPassword ? setInvalidPassword(false) : setInvalidPassword(true);

    //if both are valid, make post request
    if (checkPassword && checkEmail) {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        loginObject
      );
      setIsLoggedIn(Cookies.set("authenticated", response.data.token));
      //update modal in header so that it disappears. Could also redirect to Home with useNavigate
      setShowModal("none");
    }
  };

  //object built for the post request
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
          // if user clicks outside popup, restore scrolling
          document.body.style.overflow = "scroll";
          //user wants out, remove modal
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
              //object.email being built
              buildRequestObject("email", event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              //object.password being built
              buildRequestObject("password", event.target.value);
            }}
          />
          <div className="error-messages">
            {/* invalid email / password ? this shows up to alert the user */}
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
