import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import WalletDisplay from "../wallet/WalletDisplay";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold">Boom</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link to="/upload" className="nav-link">Upload</Link>
                </li>
                <li className="nav-item">
                  <Link to="/feed" className="nav-link">Feed</Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center">
            {user && <WalletDisplay />}
            {user ? (
              <button onClick={logout} className="btn btn-danger ms-2">Logout</button>
            ) : (
              <Link to="/login" className="btn btn-primary ms-2">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
