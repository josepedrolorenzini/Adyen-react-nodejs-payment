import React, { useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Paying..." : "Pay with Adyen"}
    </button>
  );
}

const Checkout2 = () => {
  const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      amount,
      cardNumber: formData.get("cardNumber"),
      expiryMonth: formData.get("expiryMonth"),
      expiryYear: formData.get("expiryYear"),
      cvc: formData.get("cvc"),
    };

    try {
        
     const res =    await fetch("http://localhost:4000/api/payment2" , {
            method:'POST' , 
            headers:{
                "Content-Type": "application/json",
            },
            body: [JSON.stringify({currency:"AUD", ...data})] // adding currency
        });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Payment failed");

      setMessage("✅ Payment successful");
    
    } catch (error) {
        console.error(error);
        setMessage("❌ Payment failed");
    }
    console.log("Payment data:", data);
  };



  return (
    <div style={{ maxWidth: "300px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            name="amount"
            min="1"
            placeholder="Amount ($)"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number 4111111111111111"
            minLength="13"
            maxLength="19"
            required
          />
        </div>

        <div>
          <input
            type="number"
            name="expiryMonth"
            placeholder="Month 03"
            min="1"
            max="12"
            required
          />
        </div>

        <div>
          <input
            type="number"
            name="expiryYear"
            placeholder="Year 2030"
            min={new Date().getFullYear()}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="cvc"
            placeholder="CVC 737"
            minLength="3"
            maxLength="4"
            required
          />
        </div>

        <SubmitButton />
         {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Checkout2;