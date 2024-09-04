import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllBooks } from "../API";

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getAllBooks() {
      const response = await fetchAllBooks();
      setBooks(response.books);
    }
    getAllBooks();
  }, []);

  const booksToDisplay = searchTerm
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : books;

  return (
    <>
      <div className="search">
        <label>
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      <div id="container">
        <div className="main-div">
          {booksToDisplay.length > 0 ? (
            booksToDisplay.map((book) => (
              <div
                className="all-books"
                key={book.id}
                onClick={() => {
                  navigate(`/books/${book.id}`);
                }}
              >
                <h2>{book.title}</h2>
                <img
                  className="cover"
                  src={book.coverimage}
                  alt={`${book.title} cover`}
                />
                <h5>by {book.author}</h5>
              </div>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </>
  );
}
