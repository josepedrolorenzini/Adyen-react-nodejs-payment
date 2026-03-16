import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const FetchSqlite = () => {
  const [adyenCustomerData, setAdyenCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use useCallback to memoize the function definition
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/adyen-tksystem/fetch/db",
      );
      // Use response.data (Axios wraps the JSON in a 'data' object)
      setAdyenCustomerData(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty array means this function is created only once

  // Use useEffect for side effects (like API calls)
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Only runs once because fetchData is memoized

  if (loading) return <p>Loading customers...</p>;

  return (
    <div>
      <h2>Customer Records</h2>
      <pre>{JSON.stringify(adyenCustomerData, null, 2)}</pre>
      {console.log(adyenCustomerData)}
    </div>
  );
};

export default FetchSqlite;
