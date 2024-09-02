import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Import NavBar
import AllBooks from "./components/AllBooks";
import SingleBook from "./components/SingleBook";
import MyAccount from "./components/MyAccount";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false); // State to control the modal

  const handleShowLoginModal = () => {
    setShowModal(true); // Show the login modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the login modal
  };

  return (
    <div id="container">
      <NavBar /> {/* Include NavBar at the top of the app */}
      <Routes>
        <Route path="/" element={<AllBooks />} /> {/* Route for all books */}
        <Route path="/books/:id" element={<SingleBook />} />{" "}
        {/* Route for single book details */}
        <Route path="/cart" element={<Cart />} /> {/* Route for the cart */}
        <Route
          path="/myaccount"
          element={<MyAccount showLoginModal={handleShowLoginModal} />} // Pass the function to show the login modal
        />
      </Routes>
      {/* Render the modal if showModal is true */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal content */}
            <h2>Login</h2>
            <form>
              {/* Form fields for login */}
              <label>
                Email:
                <input type="email" name="email" required />
              </label>
              <label>
                Password:
                <input type="password" name="password" required />
              </label>
              <button type="submit">Login</button>
            </form>
            <button onClick={handleCloseModal}>Close</button>{" "}
            {/* Close button for modal */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
