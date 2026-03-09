import React, { useState } from "react";
import PaymentButton from "../components/PaymentButton";

const Checkout = () => {
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("Payment Data will Appear Here");

  return (
    <>
      <h2>Checkout Page</h2>
      <PaymentButton
        textContent="Pay $10 with Adyen"
        setResult={setResult}
        setMessage={setMessage}
      ></PaymentButton>

      <pre>{result && JSON.stringify(result, null, 2)}</pre>
      <p>{message}</p>
    </>
  );
};

export default Checkout;
