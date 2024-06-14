import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { price } from "../Price";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import Header from "../component/Header";
import { useAuth } from "../context/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [marketstatus, setMarketStatus] = useState([
    "best",
    "latest",
    "upcoming",
  ]);
  const [marketstatusvalue, setMarketStatusvValue] = useState("");

  const pageNumber = [...Array(totalPages + 1).keys()].slice(1);

  const getAllcategory = () => {
    fetch(`http://localhost:8000/category/categoryView`)
      .then((res) => res.json())
      .then((record) => {
        setCategory(record.category);
      });
  };

  const getAllproduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products?page=${currentPage}&limit=6&category=${checked.join(
          ","
        )}&price=${radio}&keyword=${keyword}&marketstatus=${marketstatusvalue}`
      );
      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const categoryFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllcategory();
  }, []);

  useEffect(() => {
    getAllproduct();
  }, [checked, keyword, radio, marketstatusvalue]);

  useEffect(() => {
    getAllproduct();
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

  const AddToCart = async (id) => {
    try {
      if (!auth.token) {
        toast.error("First Login Please");
        return false;
      }

      let { data } = await axios.get(
        `http://localhost:8000/carts/product-single-record?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      let { product } = data;

      fetch(`http://localhost:8000/carts/addcarts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          categoryId: product.categoryId,
          productId: id,
          name: product.name,
          price: product.price,
          qty: product.qty,
          description: product.description,
          image: product.image,
          userId: auth.user._id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            toast.success(res.message);
          }
        });
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const LikeProduct = async (id) => {
    if (!auth?.token) {
      toast.error("Login First");
      return false;
    }
    try {
      let all = await fetch(`http://localhost:8000/products/userLikeProduct`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify({
          postId: id,
        }),
      });
      let res = await all.json();
      if (res.success) {
        toast.success(res.message);
        getAllproduct();
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const DisLikeProduct = async (id) => {
    try {
      let all = await fetch(
        `http://localhost:8000/products/userDisLikeProduct`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
          body: JSON.stringify({
            postId: id,
          }),
        }
      );
      let res = await all.json();
      if (res.success) {
        toast.error(res.message);
        getAllproduct();
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <div className="bg-dark text-light">
      <Header />
      <div
        className="container"
        style={{
          backgroundColor: "#212529",
          color: "white",
          padding: "50px",
          borderRadius: "10px",
        }}
      >
        <div className="heading mt-4">
          <h3 className="text-center">All Products</h3>
        </div>
        <div className="row pt-5 pb-5">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <h4 className="text-center">Category Filter</h4>
            {category.map((val) => (
              <div className="mt-2" key={val._id}>
                <Checkbox
                  onChange={(e) => categoryFilter(e.target.checked, val._id)}
                >
                  {val.name}
                </Checkbox>
              </div>
            ))}
            <h4 className="text-center">Price Filter</h4>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {price.map((p) => (
                <div className="mt-2" key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            <br />
            <button
              className="btn btn-danger mt-3"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
          <div className="col-lg-9">
            <div className="row justify-content-between mb-4">
              <div className="col-lg-4 mb-3">
                <label>Product Search:</label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="form-control"
                  placeholder="Product search"
                />
              </div>
              <div className="col-lg-4 mb-3">
                <label>Sort By Price:</label>
                <select className="form-control">
                  <option>---select---</option>
                  <option>High to low</option>
                  <option>Low to high</option>
                </select>
              </div>
              <div className="col-lg-4 mb-3">
                <label>Product Status:</label>
                <select
                  onChange={(e) => setMarketStatusvValue(e.target.value)}
                  className="form-control"
                >
                  <option>---select---</option>
                  {marketstatus.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              {product.map((item) => (
                <div className="col-lg-4 mb-4" key={item._id}>
                  <div
                    className="card p-3 bg-dark text-white"
                    style={{ border: "1px solid white" }}
                  >
                    <img
                      src={item.image}
                      style={{ objectFit: "contain", height: "180px" }}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <h6 className="card-text">Rs. {item.price}</h6>
                      <div className="row justify-content-between">
                        <Link
                          className="btn btn-primary btn-sm"
                          onClick={() => AddToCart(item._id)}
                          style={{ width: "120px" }}
                        >
                          Add Cart
                        </Link>
                        <Link
                          className="btn btn-success btn-sm"
                          style={{ width: "120px" }}
                        >
                          Details
                        </Link>
                      </div>
                      <div className="row justify-content-between mt-3">
                        {item.likes.includes(auth?.user?._id) ? (
                          <button
                            className="btn btn-danger btn-sm w-100"
                            onClick={() => DisLikeProduct(item._id)}
                            style={{ width: "120px" }}
                          >
                            Dislikes: {item.likes.length}
                          </button>
                        ) : (
                          <button
                            className="btn btn-info btn-sm w-100"
                            onClick={() => LikeProduct(item._id)}
                            style={{ width: "120px" }}
                          >
                            Likes: {item.likes.length}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <nav
              className="d-flex justify-content-center"
              aria-label="Page navigation example"
            >
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={handlePrevPage}
                    disabled={currentPage == 1}
                  >
                    Previous
                  </button>
                </li>
                {pageNumber.map((pgNumber) => (
                  <li
                    className={`page-item ${
                      currentPage == pgNumber ? "active" : ""
                    }`}
                    key={pgNumber}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pgNumber)}
                    >
                      {pgNumber}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
