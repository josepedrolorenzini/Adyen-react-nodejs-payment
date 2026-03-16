/* eslint-disable no-unused-vars */
import axios from "axios";
import { useMemo, useCallback, useEffect, useState } from "react";

const FetchDummy = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postResult, setPostResult] = useState(null);

  const fetchData = useCallback(async () => {
    axios
      .get("http://localhost:4000/dummyjson/test")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  /// post data
  const postData = useCallback(async (e) => {
    e.preventDefault(); // Stop the page from refreshing
    setPostLoading(true);
    setPostResult(null);

    const formData = new FormData(e.target);

    //Capture the actual values from the form
    const payload = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: formData.get("price"),
      brand: formData.get("brand"),
      category: formData.get("category"),
    };

    const response = await axios
      .post("http://localhost:4000/dummyjson/add-product", {
        title: payload.title || "Axios post",
        description: payload.description || "hello from React fetchDummy data",
        price: payload.price || 1981,
        brand: payload.brand || "axios-http.com",
        category: payload.category || "Http protocols",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setPostLoading(false);
        console.log(payload);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div>FetchDummy</div>
      <form onSubmit={postData}>
        <div>
          <input type="text" name="title" placeholder="title" />
        </div>
        <div>
          <input type="text" name="description" placeholder="description" />
        </div>
        <div>
          <input type="text" name="price" placeholder="price" />
        </div>
        <div>
          <input type="text" name="brand" placeholder="brand" />
        </div>
        <div>
          <input type="text" name="category" placeholder="category" />
        </div>
        <button disabled={postLoading} type="submit">
          {postLoading ? "Sending..." : "POST data via axios"}
        </button>
      </form>
    </>
  );
};

export default FetchDummy;
