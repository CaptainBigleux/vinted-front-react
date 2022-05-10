import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      //id : "id de l'acheteur"
      // name: "L'id de l'acheteur", doc
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    const response = await axios.post("http://localhost:3000/payment", {
      stripeToken,
    });
    console.log(response.data);
    if (response.data.status === "succeeded") setCompleted(true);
  };

  return (
    <>
      {completed ? (
        <span>Paiement effectué</span>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Payer</button>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
