import React, { useState, useEffect } from "react";
import { fetchSingleBook, checkBookAvailability } from "../API";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useCart } from "./CartContext";

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  async function handleCheckout() {
    try {
      const isAvailable = await checkBookAvailability(id);

      if (isAvailable) {
        addToCart(book);
        alert("Book added to cart!");
      } else {
        alert("Sorry, this book is not available at the moment.");
      }
    } catch (error) {
      alert("An error occurred while trying to add the book to the cart.");
    }
  }

  useEffect(() => {
    async function getBook() {
      try {
        const bookData = await fetchSingleBook(id);
        setBook(bookData);
      } catch (error) {
        setError(error.message);
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
    <div className="single-book-page">
      <NavBar />
      <div className="book-container">
        <div className="bookcard">
          <h2 id="titles">{book.title}</h2>
          <div id="info">
            <label htmlFor=""></label>
            <h4 id="author">by {book.author}</h4>
            <p id="available">
              {book.available ? "Available" : "Not Available"}
            </p>
          </div>
          <div id="describe">
            <img id="img" src={book.coverimage} alt={book.title} />
            <p id="description">{book.description}</p>
          </div>
          <Link to="/">
            <button className="back-button">Back</button>
          </Link>
          <button className="add-cart" onClick={handleCheckout}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
