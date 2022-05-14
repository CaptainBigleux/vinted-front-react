import React from "react";
import { useState } from "react";

import { validateEmail, validatePassword } from "../HelperFunctions";

import Cookies from "js-cookie";

import axios from "axios";

//very similar to login
const SignUp = ({ setShowModal, setIsLoggedIn }) => {
  //    {
  //   "email": "johndoe@lereacteur.io",
  //   "username": "JohnDoe",
  //   "password": "azerty",
  //   "newsletter": true
  // }

  //to prevent scrolling on modal
  //does not prevent scroll on mobile
  document.body.style.overflow = "hidden";

  const [signUpObject, setSignUpObject] = useState({}); //state with object to send to the post request. could also have created multiple states for each input field
  const [invalidPassword, setInvalidPassword] = useState(false); // used for password validation
  const [invalidEmail, setInvalidEmail] = useState(false); // used for email validation

  // try to sign up
  const trySignUp = async () => {
    //check if email is valid.
    const checkEmail = validateEmail(signUpObject.email);
    checkEmail === true ? setInvalidEmail(false) : setInvalidEmail(true);

    //check if password is valid.
    const checkPassword = validatePassword(signUpObject.password);
    checkPassword ? setInvalidPassword(false) : setInvalidPassword(true);

    //if both are valid, make post request
    if (checkPassword && checkEmail) {
      const response = await axios.post(
        "https://vinted-adrien.herokuapp.com/user/signup",
        signUpObject
      );

      Cookies.set("authenticated", response.data.token);
      setIsLoggedIn(response.data.token);
      document.body.style.overflow = "scroll";

      //update modal in header so that it disappears. Could also redirect to Home with useNavigate
      setShowModal("none");
    }
  };

  //object built for the post request
  const buildRequestObject = (key, keyValue) => {
    const objCopy = { ...signUpObject };
    objCopy[key] = keyValue;
    setSignUpObject(objCopy);
  };

  return (
    <div className="signup-modal">
      <div
        className="signup-bg"
        onClick={() => {
          // if user clicks outside popup, restore scrolling
          document.body.style.overflow = "scroll";
          //user wants out, remove modal
          setShowModal("none");
        }}
      ></div>
      <div className="signup-popup">
        <h3>S'inscrire</h3>
        <div className="signup-holder">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              //username being built
              buildRequestObject("username", event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              //email being built
              buildRequestObject("email", event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              //password being built
              buildRequestObject("password", event.target.value);
            }}
          />
          <div className="signup-popup-newsletter-holder">
            <p>
              <input
                className="signup-popup-newsletter-checkbox"
                type="checkbox"
                value="newsletter"
                onChange={(event) => {
                  buildRequestObject("newsletter", event.target.checked);
                }}
              />
              <span>S'inscrire à notre newsletter</span>
            </p>
            <p className="signup-popup-disclaimer">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
            <div className="error-messages">
              {/* invalid email / password ? this shows up to alert the user */}
              {invalidEmail ? (
                <p>Email non valide. Veuillez réessayer.</p>
              ) : null}
              {invalidPassword ? (
                <p>
                  Votre mot de passe doit contenir une majuscule, une minuscle,
                  un chiffre ainsi qu'un caractère spécial.
                </p>
              ) : null}
            </div>
          </div>
          <button
            className="signup-btn"
            onClick={() => {
              trySignUp();
            }}
          >
            S'inscrire
          </button>
          <div className="switch-signup-login-holder">
            Vous avez déjà un compte ?
            <button
              onClick={() => {
                setShowModal("login");
              }}
            >
              Connectez-vous !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
