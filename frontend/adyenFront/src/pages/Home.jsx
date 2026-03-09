import { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <button
        onClick={(e) => {
          e.preventDefault();
          setMessage("Adyen Test Project");
          console.log(message);
          setCount((preValue) => preValue + 1);
        }}
      >
        Click Me
      </button>
      <p>{message}</p>
      <p>Count: {count}</p>
    </div>
  );
};

export default Home;
