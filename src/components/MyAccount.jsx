import React, { useEffect, useState } from "react";
import { fetchUserDetails, returnBook } from "../API";

const MyAccount = ({ token, setToken }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const response = await fetchUserDetails(token);
    setUserData(response);
  };

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const handleLogout = () => {
    setToken("");
    setUserData(null); // Clear user data to remove account details from the page
  };

  return (
    <div className="account-container">
      {userData ? (
        <div id="account">
          <h2 className="header" id="welcome">
            Welcome!
          </h2>
          <h1 className="header1">My Books</h1>
          <div className="main-div">
            {userData.books.length === 0 ? (
              <h2 className="header">No books checked out</h2>
            ) : (
              userData.books.map((book) => (
                <div key={book.id} className="all-books">
                  <h2>{book.title}</h2>
                  <img
                    className="cover"
                    src={book.coverimage}
                    alt={book.title}
                  />
                  <h5>by {book.author}</h5>
                  <button
                    className="return-button"
                    onClick={async () => {
                      await returnBook(book.id, token);
                      await fetchUserData();
                    }}
                  >
                    Return
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="unauthorized">
          <h2>Please log in or create an account to continue.</h2>
        </div>
      )}
      {userData && (
        <div className="account-details">
          <h2 className="header2">Email: {userData.email}</h2>
          {token && (
            <button className="logout-button" onClick={handleLogout}>
              Log out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAccount;
