import React, { useState, useCallback } from "react";
import PaymentButton from "../components/PaymentButton";

const Checkout = () => {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("Payment Data will Appear Here");

  // ✅ Memoize the handlers
  const handleSetPending = useCallback((value) => setPending(value), []);
  const handleSetResult = useCallback((data) => setResult(data), []);
  const handleSetMessage = useCallback((msg) => setMessage(msg), []);

  return (
    <>
      <h2>Checkout Page</h2>
      <PaymentButton
        textContent="Pay With Adyen"
        setResult={handleSetResult}
        setMessage={handleSetMessage}
        setPendings={handleSetPending}
      ></PaymentButton>

      <pre>
        {pending ? (
          <p>Processing...</p>
        ) : (
          result && JSON.stringify(result, null, 2)
        )}
      </pre>
      {result && console.log(result)}
      <p>{message}</p>
    </>
  );
};

export default Checkout;
