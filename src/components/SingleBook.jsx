import React, { useState, useEffect } from "react";
import { fetchSingleBook } from "../API";
import { useParams, Link } from "react-router-dom";
import Cart from "./Cart";
import Modal from "./Modal"; // Import the Modal component

function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
    setShowModal(true); // Show the modal when a book is added
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
      <header>
        <button onClick={toggleModal}>View Cart ({cart.length})</button>
      </header>

      <div className="bookcard">
        <h2>{book.title}</h2>
        <h4>Author: {book.author}</h4>
        <p>Available? {book.available ? "Yes" : "No"}</p>
        <img src={book.coverimage} alt={book.title} />
        <p>{book.description}</p>
        <button onClick={() => addToCart(book)}>Add to Cart</button>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>

      <Modal show={showModal} onClose={toggleModal}>
        <Cart cart={cart} />
      </Modal>
    </div>
  );
}

export default SingleBook;
