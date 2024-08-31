import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./components/AllBooks";
import SingleBook from "./components/SingleBook";
import Cart from "./components/Cart";
import { fetchAllBooks } from "./API";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await fetchAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    }
    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    setSearchParams(query);
  };

  return (
    <div id="container">
      <Routes>
        <Route
          path="/"
          element={
            <AllBooks
              books={books}
              searchParams={searchParams}
              setSearchParams={handleSearch}
            />
          }
        />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
