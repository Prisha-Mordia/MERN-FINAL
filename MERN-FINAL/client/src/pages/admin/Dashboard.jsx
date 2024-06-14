import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import Leftsidebar from "./Leftsidebar";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);
  const [categories, setcategories] = useState([]);
  const [products, setProducts] = useState([]);

  const getUsers = async () => {
    try {
      let all = await fetch(`http://localhost:8000/admin/users/adminviewuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      let res = await all.json();
      setUsers(res.users);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getCategory = () => {
    fetch(`http://localhost:8000/admin/category/viewcategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          setcategories(res.category);
        }
      });
  };

  useEffect(() => {
    getUsers();
    getCategory();
  }, []);

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      <Header />
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col-lg-3">
            <Leftsidebar />
          </div>
          <div className="col-lg-9">
            <div className="card bg-dark text-light glassmorphism rounded-lg shadow-lg mb-4">
              <div className="card-header text-center">
                <h3>Dashboard</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 mb-4">
                <div className="glassmorphism rounded-lg p-3 text-center h-100">
                  <h5 className="mb-0">Users</h5>
                  <p className="mb-0">{users.length}</p>
                </div>
              </div>
              <div className="col-lg-3 mb-4">
                <div className="glassmorphism rounded-lg p-3 text-center h-100">
                  <h5 className="mb-0">Categories</h5>
                  <p className="mb-0">{categories.length}</p>
                </div>
              </div>
              <div className="col-lg-3 mb-4">
                <div className="glassmorphism rounded-lg p-3 text-center h-100">
                  <h5 className="mb-0">Products</h5>
                  <p className="mb-0">{products.length}</p>
                </div>
              </div>
              <div className="col-lg-3 mb-4">
                <div className="glassmorphism rounded-lg p-3 text-center h-100">
                  <h5>Total Likes</h5>
                  <p>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
