import React, { useState, useEffect } from "react";
import { fetchSingleBook } from "../API";
import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBook() {
      try {
        const bookData = await fetchSingleBook(id);
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Failed to fetch book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getBook();
  }, [id]);

  if (loading) {
    return <p>Loading book information...</p>;
  }

  if (error) {
    return <p>Error fetching book: {error}</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="book-container">
      <div className="bookcard">
        <h2 id="titles">{book.title}</h2>
        <div id="info">
          <h4 id="author">Author: {book.author}</h4>
          <p id="available">Available? {book.available ? "Yes" : "No"}</p>
        </div>
        <img id="img" src={book.coverimage} alt={book.title} />
        <p id="description">{book.description}</p>
        <Link to="/">
          <button className="back-button">Back</button>
        </Link>
        <Link to="/Cart">
          <button className="add-cart">Add To Cart</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleBook;
