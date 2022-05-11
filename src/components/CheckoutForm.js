import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ _id, name }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //manage the case where fields are empty
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: name,
      userId: _id,
    });

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://vinted-adrien.herokuapp.com/payment",
      {
        stripeToken,
      }
    );
    console.log(response.data);
    if (response.data.status === "succeeded") setCompleted(true);
  };

  return (
    <>
      {completed ? (
        <span>Paiement effectué</span>
      ) : (
        <form onSubmit={handleSubmit} className="payment-stripe-form">
          <div className="payment-stripe-field">
            <CardElement />
          </div>
          <button className="payment-stripe-btn" type="submit">
            Payer
          </button>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
