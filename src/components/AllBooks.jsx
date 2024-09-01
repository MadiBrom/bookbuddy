import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function AllBooks({ books, searchParams, setSearchParams }) {
  const navigate = useNavigate();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchParams.toLowerCase())
  );

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a book..."
          onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
        />
      </div>
      <div className="contain"></div>
      <div className="books-container">
        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => handleBookClick(book.id)}
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllBooks;
