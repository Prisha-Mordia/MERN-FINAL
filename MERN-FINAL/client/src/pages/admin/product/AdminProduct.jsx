import React, { useEffect, useState } from "react";
import Leftsidebar from "../Leftsidebar";
import Header from "../../../component/Header";
import { useAuth } from "../../../context/Auth";
import { Link, useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(["best", "latest", "upcomming"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [marketstatus, setMarketStatus] = useState("");

  const pageNumber = [...Array(totalPages + 1).keys()].slice(1);

  const getProduct = async () => {
    let data = await fetch(
      `http://localhost:8000/products/adminviewproduct?page=${currentPage}&limit=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      }
    );
    let res = await data.json();
    if (res.success) {
      setTotalPages(res.totalPages);
      setProducts(res.products);
    }
  };

  const marketStatusEdit = async (value, id) => {
    let d = await fetch(
      `http://localhost:8000/admin/product/updatemarketstatus?id=${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          mstatus: value,
        }),
      }
    );
    let res = await d.json();
    if (res.success) {
      alert(res.message);
      getProduct();
    }
  };

  useEffect(() => {
    getProduct();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let data = await fetch(
        `http://localhost:8000/admin/product/deleteproduct?id=${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      let res = await data.json();
      if (res.success) {
        alert(res.message);
        getProduct();
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column">
      <Header />
      <br />
      <br />
      <div
        className="container mt-5 text-white"
        style={{ backgroundColor: "#212529" }}
      >
        <div className="row">
          <div className="col-lg-3">
            <Leftsidebar />
          </div>
          <div className="col-lg-9">
            <div
              className="card"
              style={{
                backgroundColor: "#212529",
                color: "white",
                border: "1px solid white",
              }}
            >
              <h5
                className="card-header"
                style={{ borderBottom: "1px solid white" }}
              >
                Product
              </h5>
              <div className="d-flex justify-content-end p-3">
                <Link to={`/admin/addproduct`}>
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ backgroundColor: "green" }}
                  >
                    Add
                  </button>
                </Link>
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover table-dark">
                  <thead className="table-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Market Status</th>
                      <th>Likes</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, index) => {
                      return (
                        <tr key={p._id}>
                          <td>{++index}</td>
                          <td>{p.name}</td>
                          <td>
                            <img src={p.image} alt="" width="50" />
                          </td>
                          <td>{p.price}</td>
                          <td>
                            <select
                              onChange={(e) =>
                                marketStatusEdit(e.target.value, p._id)
                              }
                              className="form-control w-75"
                              style={{
                                backgroundColor: "#212529",
                                color: "white",
                                border: "1px solid white",
                              }}
                            >
                              <option>---select status---</option>
                              {status.map((mstatus) => {
                                return p.marketstatus === mstatus ? (
                                  <option value={p.marketstatus} selected>
                                    {p.marketstatus}
                                  </option>
                                ) : (
                                  <option>{mstatus}</option>
                                );
                              })}
                            </select>
                          </td>
                          <td>{p.likes.length}</td>
                          <td>
                            <button
                              onClick={() => deleteProduct(p._id)}
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>
                            <Link to={`/admin/editproduct/${p._id}`}>
                              <button className="btn btn-primary btn-sm ms-2">
                                Edit
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li className="page-item" onClick={handlePrevPage}>
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      style={{
                        backgroundColor: "#212529",
                        color: "white",
                        border: "1px solid white",
                      }}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {pageNumber.map((pgNumber) => (
                    <li
                      key={pgNumber}
                      className={`page-item ${
                        currentPage === pgNumber ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(pgNumber)}
                    >
                      <a
                        className="page-link"
                        href="#"
                        style={{
                          backgroundColor: "#212529",
                          color: "white",
                          border: "1px solid white",
                        }}
                      >
                        {pgNumber}
                      </a>
                    </li>
                  ))}
                  <li className="page-item" onClick={handleNextPage}>
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      style={{
                        backgroundColor: "#212529",
                        color: "white",
                        border: "1px solid white",
                      }}
                    >
                      <span className="sr-only">Next</span>
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
