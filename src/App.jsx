import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Books from "./pages/AllBooks";
import NavBar from "./components/NavBar";
import SingleBook from "./pages/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import MyAccount from "./components/MyAccount";
import { getReservations } from "./API";
import { useEffect } from "react";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchReservations = async () => {
        const response = await getReservations(token);
        setReservations(response);
      };

      fetchReservations();
    }
  }, []);

  return (
    <>
      <div id="navigation">
        <NavBar setSearchParams={setSearchParams} token={token} />
      </div>
      <h1 className="title">The Underground Library</h1>
      <div id="book-div">
        <Routes>
          <Route
            path="/"
            element={
              <Books
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            }
          />
          <Route path="books/:id" element={<SingleBook token={token} />} />
          <Route
            path="/users/login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route
            path="/users/register"
            element={<Register token={token} setToken={setToken} />}
          />
          <Route
            path="/users/me"
            element={
              <MyAccount
                token={token}
                setToken={setToken}
                reservations={reservations}
                setReservations={setReservations}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
