import React, { useState, useEffect } from "react";
import { fetchSingleBook, checkBookAvailability } from "../API";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useCart } from "../components/CartContext";

function SingleBook() {
  const { id } = useParams(); // Extract the book ID from the URL parameters
  const [book, setBook] = useState(null); // State to store the book details
  const [error, setError] = useState(null); // State to manage error status
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { addToCart } = useCart(); // Access the addToCart function from CartContext
  const navigate = useNavigate(); // React Router hook for navigation

  // Function to handle the checkout process
  async function handleCheckout() {
    try {
      const isAvailable = await checkBookAvailability(id); // Check if the book is available

      if (isAvailable) {
        addToCart(book); // Add the book to the cart if available
        alert("Book added to cart!"); // Provide feedback to the user
      } else {
        alert("Sorry, this book is not available at the moment.");
      }
    } catch (error) {
      console.error("Checkout error:", error); // Log the error for debugging
      alert("An error occurred while trying to add the book to the cart.");
    }
  }

  // Fetch the details of a single book based on the ID from the URL params
  useEffect(() => {
    async function getBook() {
      try {
        const bookData = await fetchSingleBook(id); // Fetch single book details
        setBook(bookData); // Set the book details in state
      } catch (error) {
        setError(error.message); // Set the error state if fetching fails
      } finally {
        setLoading(false); // Stop loading indicator
      }
    }
    getBook(); // Call the function to fetch book details on component mount
  }, [id]); // Run the effect whenever the ID changes

  // Display a loading message while fetching data
  if (loading) {
    return <p>Loading book information...</p>;
  }

  // Display an error message if there's an issue with fetching data
  if (error) {
    return <p>Error fetching book: {error}</p>;
  }

  // Display a message if no book is found
  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="single-book-page">
      <NavBar /> {/* Navigation bar at the top */}
      <div className="book-container">
        <div className="bookcard">
          <h2 id="titles">{book.title}</h2> {/* Book title */}
          <div id="info">
            <h4 id="author">by {book.author}</h4> {/* Book author */}
            <p id="available">
              {book.available ? "Available" : "Not Available"}{" "}
              {/* Book availability */}
            </p>
          </div>
          <div id="describe">
            <img id="img" src={book.coverimage} alt={book.title} />{" "}
            {/* Book cover image */}
            <p id="description">{book.description}</p> {/* Book description */}
          </div>
          <Link to="/">
            <button className="back-button">Back</button> {/* Back to home */}
          </Link>
          <button className="add-cart" onClick={handleCheckout}>
            Checkout {/* Add to cart button */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
