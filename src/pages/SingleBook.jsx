import { fetchSingleBook } from "../API";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkBook } from "../API";

export default function SingleBook({ token }) {
  const [book, setBook] = useState(null);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBook() {
      const response = await fetchSingleBook(id);
      setBook(response.book);
    }

    fetchBook();
  }, []);

  const handleCheckout = async () => {
    await checkBook(book.id, token, false);
    setIsCheckedOut(true);
  };

  return (
    <>
      {book && (
        <div className="single-main">
          <main className="single-book" key={book.id}>
            <h2>{book.title}</h2>
            <img className="cover" src={book.coverimage} />
            <h3>by {book.author}</h3>
            <p>{book.description}</p>
            {token && book.available && !isCheckedOut && (
              <button className="checkout-button" onClick={handleCheckout}>
                Check out
              </button>
            )}
            {isCheckedOut && <p className="red-text">Checked out</p>}
            {!token && book.available && (
              <p className="red-text">
                Please log in or register to check out this title.
              </p>
            )}
            {!book.available && (
              <p className="red-text">This book is currently unavailable.</p>
            )}
          </main>
        </div>
      )}
    </>
  );
}
