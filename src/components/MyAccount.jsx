import React, { useEffect, useState } from "react";
import { fetchUserDetails, returnBook } from "../API";

const Account = ({ token, setToken }) => {
  const [userData, setUserData] = useState(null);
  const fetchUserData = async () => {
    const response = await fetchUserDetails(token);
    setUserData(response);
  };
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2 className="header">Welcome, {userData.firstname}!</h2>
          <h2 className="header">Email: {userData.email}</h2>
          <h1 className="header">My Books</h1>
          <div className="main-div">
            <br />
            {userData.books.length === 0 ? (
              <h2 className="header">No books checked out</h2>
            ) : (
              userData.books.map((book) => (
                <main key={book.id} className="all-books">
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
                </main>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="unauthorized">
          <h2>Please log in or create an account to continue.</h2>
        </div>
      )}
      {token && (
        <div className="registration">
          <button
            className="logout-button"
            onClick={async () => {
              setToken("");
              await fetchUserData();
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
