import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllBooks } from "../API";

export default function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    // Cleanup timeout if the user types before the timeout is over
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    async function getAllBooks() {
      const response = await fetchAllBooks();
      setBooks(response.books);
    }
    getAllBooks();
  }, []);

  const booksToDisplay = debouncedSearchTerm
    ? books.filter((book) =>
        book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    : books;

  return (
    <>
      <div id="container">
        <div className="search">
          <input
            type="search"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
