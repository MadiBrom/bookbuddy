import { Link } from "react-router-dom";

export default function NavBar({ token }) {
  return (
    <div className="navbar">
      <Link to="/">
        <button className="nav-button">Home</button>
      </Link>

      {!token && (
        <Link to="/users/login">
          <button className="nav-button">Login</button>
        </Link>
      )}
      {!token && (
        <Link to="/users/register">
          <button className="nav-button">Register</button>
        </Link>
      )}
      <Link to="/users/me">
        <button className="nav-button">My Account</button>
      </Link>
    </div>
  );
}
