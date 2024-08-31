import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { handleLogin, handleSignUp } from "../API";

function AllBooks({ books }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchParams.toLowerCase())
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  function handleClick(id) {
    navigate(`/books/${id}`);
  }

  return (
    <div className="App">
      <header>
        <NavBar
          setSearchParams={setSearchParams}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          handleLogout={handleLogout}
        />
      </header>
      <div className="contain">
        <div className="search">
          <input
            type="text"
            placeholder="Search for a book..."
            onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="books-container">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => handleClick(book.id)}
          >
            <h3 className="book-card-title">{book.title}</h3>
            <div className="book-card-content">
              <img
                src={book.coverimage}
                alt={book.title}
                className="bookcard-img"
              />
              <div className="book-card-details">
                <h5 className="book-card-author">Author: {book.author}</h5>
                <p className="book-card-availability">
                  Available: {book.available ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
