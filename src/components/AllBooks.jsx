import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { handleLogin, handleSignUp } from "../API";

function AllBooks({ books }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchParams.toLowerCase())
  );

  function handleClick(id) {
    navigate(`/books/${id}`);
  }
  return (
    <div className="App">
      <header>
        <NavBar
          setSearchParams={setSearchParams}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
        />
      </header>

      <h2 id="title">Library</h2>
      <div className="books-container">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => handleClick(book.id)}
          >
            <h3 className="book-card-title">{book.title}</h3>
            <div className="book-card-content">
              <img
                src={book.coverimage}
                alt={book.title}
                className="bookcard-img"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
