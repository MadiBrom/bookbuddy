import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { fetchBooks } from "../API";

function AllBooks({ searchParams = "", setSearchParams }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async (token) => {
      try {
        const fetchedBooks = await fetchBooks(token);
        setBooks(fetchedBooks || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const authToken = localStorage.getItem("authToken");
    loadBooks(authToken);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredBooks = Array.isArray(books)
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchParams.toLowerCase())
      )
    : [];

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <header>
        <NavBar />
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
                  <p className="book-card-availability">
                    Available: {book.available ? "Yes" : "No"}
                  </p>
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
