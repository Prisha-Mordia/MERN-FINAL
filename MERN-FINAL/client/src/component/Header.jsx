import React, { useEffect } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Fashion Store
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {!auth?.user ? (
                  <>
                    <li className="nav-item">
                      <Link to={`/login`} className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/register`} className="nav-link">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      {auth?.user?.role === "admin" ? (
                        <Link to={`/admin/dashboard`} className="nav-link">
                          Dashboard
                        </Link>
                      ) : null}
                    </li>
                    {auth?.user?.role !== "admin" && (
                      <>
                        <li className="nav-item">
                          <Link to={`/`} className="nav-link">
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={`/product`} className="nav-link">
                            Product
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={`/cart`} className="nav-link">
                            Cart
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to={`/profile`} className="nav-link">
                            Profile
                          </Link>
                        </li>
                      </>
                    )}
                    <li className="nav-item">
                      <Link onClick={handleLogout} className="nav-link">
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
