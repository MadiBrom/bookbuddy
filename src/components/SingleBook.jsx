import React, { useState, useEffect } from "react";
import { fetchSingleBook } from "../API";
import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // Cart state

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

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, book]);
    alert("Book added to cart!");
  };

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
        setSearchParams={(params) => console.log(params)} // Placeholder function, replace as needed
        handleLogin={(email, password) => Promise.resolve("fake-token")} // Replace with actual login function
        handleSignUp={(first, last, email, password) =>
          Promise.resolve("fake-token")
        } // Replace with actual sign-up function
      />
      <div className="book-container">
        <div className="bookcard">
          <h2 id="titles">{book.title}</h2>
          <div id="info">
            <label htmlFor=""></label>
            <h4 id="author">by {book.author}</h4>
            <p id="available">
              {" "}
              {book.available ? "Available" : "Not Available"}
            </p>
          </div>
          <img id="img" src={book.coverimage} alt={book.title} />
          <p id="description">{book.description}</p>
          <Link to="/">
            <button className="back-button">Back</button>
          </Link>
          <button className="add-cart" onClick={handleAddToCart}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
