import { useCallback, useState } from "react";

const PaymentButton = ({ setResult, textContent, setMessage, setPendings }) => {
  const [pending, setLocalPending] = useState(false);

  const handlePayment = useCallback(async () => {
    try {
      setLocalPending(true);
      setPendings(true);

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
      setLocalPending(false);
      setMessage("Payment Failed");
      console.log(error);
    } finally {
      // this way i put the data and the button ntext back
      setLocalPending(false);
      setPendings(false);
    }
  }, [setResult, setMessage, setPendings]);
  return (
    <>
      <button onClick={handlePayment} disabled={pending}>
        {pending ? "Processing..." : textContent}
      </button>
    </>
  );
};

export default PaymentButton;
