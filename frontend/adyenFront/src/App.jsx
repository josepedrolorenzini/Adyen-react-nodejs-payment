import { Link, Route, Routes } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Checkout2 from "./pages/Checkout2";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="checkout2" element={<Checkout2 />} />
      </Routes>
    </Layout>
  );
}

export default App;
