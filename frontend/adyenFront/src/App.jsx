import { useEffect, useMemo, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(null);

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

  // useEffect(() => {
  //   fetch("http://localhost:4000/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

  return (
    <div>
      <h1>Adyen Test Project</h1>
      <p>{message}</p>
      <p>Count: {count}</p>

      <button
        onClick={(e) => {
          e.preventDefault();
          console.log(message);
          setCount((preValue) => preValue + 1);
        }}
      >
        Click Me
      </button>
      <button onClick={handlePayment}>Pay $10</button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default App;
