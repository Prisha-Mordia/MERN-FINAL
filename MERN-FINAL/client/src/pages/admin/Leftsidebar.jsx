import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaBoxOpen } from "react-icons/fa";
import "./dashboard.css";

const Leftsidebar = () => {
  const currentPath = window.location.pathname;

  return (
    <div className="glassmorphism rounded-lg p-3 mb-4 bg-dark">
      <h5 className="text-center mb-4">Admin Panel</h5>
      <div className="list-group">
        <Link
          to={`/admin/dashboard`}
          className={`list-group-item list-group-item-action glassmorphism-item ${
            currentPath === "/admin/dashboard" ? "active" : "bg-dark text-white"
          }`}
          aria-current="true"
        >
          <FaTachometerAlt className="me-2" />
          Dashboard
        </Link>

        <Link
          to={`/admin/category`}
          className={`list-group-item list-group-item-action glassmorphism-item ${
            currentPath === "/admin/category" ? "active" : "bg-dark text-white"
          }`}
          aria-current="true"
        >
          <FaClipboardList className="me-2" />
          Category
        </Link>

        <Link
          to={`/admin/product`}
          className={`list-group-item list-group-item-action glassmorphism-item ${
            currentPath === "/admin/product" ? "active" : "bg-dark text-white"
          }`}
          aria-current="true"
        >
          <FaBoxOpen className="me-2" />
          Product
        </Link>
      </div>
    </div>
  );
};

export default Leftsidebar;
