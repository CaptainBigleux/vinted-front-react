import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

import { useLocation } from "react-router-dom";

const Payment = ({ isLoggedIn }) => {
  const location = useLocation();

  //info coming from SideCart
  //state name is mandatory
  const { _id, product_name, price } = location.state;

  const stripePromise = loadStripe(
    "pk_test_51KxqguJXU9GKJOxxn1vdsqGj0HYGuLNT61h5REsvrEFKDNMGPP3BXRrNt7RJC3UBowZUXs95uJtIDflrg48Fo4f800oVJL5VRy"
  );
  return (
    <main className="payment-page">
      <div className="payment-top-half-holder">
        <span>Résumé de la commande</span>

        <p className="payment-inline-flex">
          <span>Commande</span>
          <span>{price + " €"}</span>
        </p>
        <p className="payment-inline-flex">
          <span>Frais protection acheteurs</span>
          <span>0.40 €</span>
        </p>
        <p className="payment-inline-flex">
          <span>Frais de port</span>
          <span>0.80 €</span>
        </p>
      </div>
      <div className="payment-bottom-half-holder">
        <p className="payment-inline-flex">
          <span>Total</span>
          <span>{parseFloat(price + 0.4 + 0.8).toFixed(2) + " €"}</span>
        </p>
        <p className="payment-desc">
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <strong>{product_name}</strong>. Vous allez payer{" "}
          <strong>{parseFloat(price + 0.4 + 0.8).toFixed(2) + " €"}</strong>{" "}
          (frais de protection et de frais de port inclus).
        </p>
        <div className="payment-stripe">
          {isLoggedIn ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm _id={_id} isLoggedIn={isLoggedIn} />
            </Elements>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Payment;
