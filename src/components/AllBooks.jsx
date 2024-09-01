import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../API";
import NavBar from "./NavBar";

function AllBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Attempt to fetch books from the API
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks || []);
      } catch (err) {
        console.error("Error loading books:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || "An error occurred"}</div>;

  const filteredBooks = (books || []).filter((book) =>
    book.title.toLowerCase().includes(searchParams.toLowerCase())
  );

  console.log("Filtered Books:", filteredBooks); // Log filtered books

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

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
      <div className="books-container" onClick={handleBookClick}>
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
