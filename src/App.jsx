import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import NavBar
import AllBooks from "./components/AllBooks";
import SingleBook from "./components/SingleBook";
import MyAccount from "./components/MyAccount";
import Cart from "./components/Cart";
import { fetchBooks } from "./API";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    async function fetchAllBooks() {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    }
    fetchAllBooks();
  }, []);

  const handleSearch = (query) => {
    setSearchParams(query);
  };

  return (
    <div id="container">
      <NavBar />
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
        <Route path="/myaccount" element={<MyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
