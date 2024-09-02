import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../API";
import NavBar from "../components/NavBar";

function AllBooks() {
  const navigate = useNavigate(); // React Router hook for navigation
  const [books, setBooks] = useState([]); // State to store fetched books
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status
  const [searchParams, setSearchParams] = useState(""); // State for search input

  // Fetch books when the component mounts
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks(); // Fetch books from API
        if (Array.isArray(fetchedBooks)) {
          setBooks(fetchedBooks); // Set books in state if response is valid
        } else {
          setError("Unexpected response structure from the API."); // Handle unexpected response
        }
      } catch (err) {
        console.error("Error loading books:", err); // Log error to console
        setError(err.message || "An error occurred while loading books."); // Set error state
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    loadBooks(); // Load books on component mount
  }, []);

  // Display a loading message while fetching data
  if (loading) return <div>Loading...</div>;

  // Display an error message if there's an issue with fetching data
  if (error)
    return (
      <div>
        Error: {error}.{" "}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  // Filter books based on search parameters
  const filteredBooks = (books || []).filter((book) =>
    book.title.toLowerCase().includes(searchParams.toLowerCase())
  );

  // Navigate to the book details page when a book is clicked
  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="App">
      <header>
        <NavBar /> {/* Navigation bar at the top */}
      </header>
      <div className="contain">
        <div className="search">
          <input
            type="text"
            placeholder="Search for a book..."
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value.toLowerCase())} // Update search parameters
          />
        </div>
      </div>
      <div className="books-container">
        {filteredBooks.length === 0 ? (
          <p>No books found.</p> // Display message if no books match the search
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => handleBookClick(book.id)} // Navigate to book details on click
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
