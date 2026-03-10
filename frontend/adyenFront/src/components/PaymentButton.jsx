import { useState } from "react";

const PaymentButton = ({ setResult, textContent, setMessage }) => {
  const [pending, setPending] = useState(false);
  const handlePayment = async () => {
    try {
      setPending(true);
      const res = await fetch("http://localhost:4000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: {
            currency: "AUD",
            value: 1000,
          },
        }),
      });
      setMessage("Payment Successful");
      const data = await res.json();
      setResult(data);
    } catch (error) {
      setPending(false);
      setMessage("Payment Failed");
      console.log(error);
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <button onClick={handlePayment} disabled={pending}>
        {pending ? "Processing..." : textContent}
      </button>
    </>
  );
};

export default PaymentButton;
