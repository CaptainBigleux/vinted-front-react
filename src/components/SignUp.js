import React from "react";

const SignUp = ({ setShowModal }) => {
  //to prevent scrolling on modal
  document.body.style.overflow = "hidden";
  //does not prevent scroll on mobile

  return (
    <div className="signup-modal">
      <div
        className="signup-bg"
        onClick={() => {
          setShowModal("none");
        }}
      ></div>
      <div className="signup-popup">
        <h3>S'inscrire</h3>
        <form className="signup-form" action="submit">
          <input type="text" placeholder="Nom d'utilisateur" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Mot de passe" />
          <div className="signup-popup-newsletter-holder">
            <p>
              <input
                className="signup-popup-newsletter-checkbox"
                type="checkbox"
              />
              <span>S'inscrire à notre newsletter</span>
            </p>
            <p className="signup-popup-disclaimer">
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <input type="submit" value="S'inscrire" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
