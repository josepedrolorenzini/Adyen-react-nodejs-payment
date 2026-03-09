const PaymentButton = ({ setResult, textContent, setMessage }) => {
  const handlePayment = async () => {
    try {
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
      setMessage("Payment Failed");
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={handlePayment}>{textContent}</button>
    </>
  );
};

export default PaymentButton;
