import React, { useState, useEffect } from "react";
import { fetchSingleBook } from "../API";
import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useCart } from "./CartContext";
import { checkBookAvailability } from "../API";

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const { addToCart } = useCart();

  function handleCheckout() {
    addToCart(book);
    alert("Book added to cart!");
    setCart((prevCart) => [...prevCart, book]);
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to add items to the cart.");
      navigate("/login");
      return;
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

  async function handleCheckout() {
    try {
      const isAvailable = await checkBookAvailability(book.id);

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
      <NavBar
        handleLogin={(email, password) => Promise.resolve("authToken")}
        handleSignUp={(first, last, email, password) =>
          Promise.resolve("token")
        }
      />
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
          <img id="img" src={book.coverimage} alt={book.title} />
          <p id="description">{book.description}</p>
          <Link to="/">
            <button className="back-button">Back</button>
          </Link>
          <button className="add-cart" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
