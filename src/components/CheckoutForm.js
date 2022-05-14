import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ _id, isLoggedIn }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //manage the case where fields are empty
      //retrieve card info
      const cardInfos = elements.getElement(CardElement);
      //send card info and check if valid
      const stripeResponse = await stripe.createToken(cardInfos, {
        name: _id,
      });

      const response = await axios.post(
        "https://vinted-adrien.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          _id: _id,
        },
        {
          headers: {
            authorization: `Bearer ${isLoggedIn}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") setCompleted(true);
    } catch (error) {
      console.log(error);
    }
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
