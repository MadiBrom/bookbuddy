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
  }, [id]);

  const handleCheckout = async () => {
    await checkBook(book.id, token, false);
    setIsCheckedOut(true);
  };

  return (
    <>
      {book && (
        <div className="single-main">
          <div id="status-contain">
            <div className="availability-status">
              {book.available ? (
                <p className="green-text">This book is available.</p>
              ) : (
                <p className="red-text">This book is currently unavailable.</p>
              )}
            </div>
            <main className="single-book" key={book.id}>
              <div>
                <h2>{book.title}</h2>{" "}
                <img className="cover" src={book.coverimage} alt={book.title} />
                <h3>by {book.author}</h3>{" "}
              </div>
              <div>
                <h4>Description</h4>
                <p>{book.description}</p>
              </div>
              {/* Availability Information */}
              {/* Checkout Button and Status */}
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
            </main>
          </div>
        </div>
      )}
    </>
  );
}
