import { useNavigate, useState, useEffect } from "react-router-dom";
import { fetchBooks } from "../API";

function AllBooks({ searchParams = "", setSearchParams }) {
  const navigate = useNavigate;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks();
        console.log("Fetched Books:", fetchedBooks); // Log fetched books
        setBooks(fetchedBooks || []);
      } catch (err) {
        console.error("Error loading books:", err); // Log detailed error
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  console.log("Books State:", books); // Log books state
  console.log("Search Params:", searchParams); // Log search params

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || "An error occurred"}</div>;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchParams.toLowerCase())
  );

  console.log("Filtered Books:", filteredBooks); // Log filtered books

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <div className="contain">
        <div className="search">
          <input
            type="text"
            placeholder="Search for a book..."
            onChange={(e) => setSearchParams(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <div className="books-container">
        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="book-card"
              onClick={() => handleBookClick(book.id)}
            >
              <h3 className="book-card-title">{book.title}</h3>
              <div className="book-card-content">
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className="bookcard-img"
                />
                <div className="book-card-details">
                  <h5 className="book-card-author">Author: {book.author}</h5>
                  <p className="book-card-availability">
                    Available: {book.available ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
