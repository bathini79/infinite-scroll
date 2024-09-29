import axios from "axios";
import React, { useEffect, useState } from "react";
const UseBookQuery = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  useEffect(() => {
    setBooks([]);
  }, [search]);
  useEffect(() => {
    setLoading(true);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: { q: search, page: page },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([...prevBooks, ...res.data.docs.map((b) => b.title)]),
          ];
        });
        setLoading(false);
      })
      .catch((e) => {
        if (e.cancel) {
          return;
        }
      });
    return () => {
      cancel();
    };
  }, [search, page]);
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handlePage = () => {
    setPage(prev=>prev+1)
  };
  return { books, handleInput, handlePage, loading };
};
export default UseBookQuery;
