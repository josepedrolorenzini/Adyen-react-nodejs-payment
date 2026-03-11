import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div>
      <h1>Adyen Test Project</h1>

      <nav>
        <Link to="/">Home</Link> | <Link to="/checkout">Payment</Link> | <Link to="/checkout2">Payment2</Link>

      </nav>

      <hr />

      {children}
    </div>
  );
}
