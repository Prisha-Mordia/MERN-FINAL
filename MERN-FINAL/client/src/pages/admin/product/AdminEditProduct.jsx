import React, { useEffect, useState } from "react";
import Leftsidebar from "../Leftsidebar";
import Header from "../../../component/Header";
import { useAuth } from "../../../context/Auth";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [categorydata, setCategoryData] = useState([]);
  const [mstatus, setMStatus] = useState(["best", "latest", "upcoming"]);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [selectcategory, setSelectCategory] = useState("");
  const [selectmarketstatus, setSelectMarketStatus] = useState("");
  const [singleimage, setsingleImage] = useState("");

  const getCategory = async () => {
    try {
      let data = await fetch(`http://localhost:8000/category/categoryView`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      let res = await data.json();
      if (res.success) {
        setCategoryData(res.category);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getsingleProduct = async () => {
    try {
      let data = await fetch(
        `http://localhost:8000/admin/product/fetchsingleproduct/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      let res = await data.json();
      setSelectCategory(res.product.categoryId.name);
      setName(res.product.name);
      setPrice(res.product.price);
      setDescription(res.product.description);
      setsingleImage(res.product.image);
      setSelectMarketStatus(res.product.marketstatus);
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getsingleProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("marketstatus", status);

      let data = await fetch(
        `http://localhost:8000/admin/product/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
          body: formData,
        }
      );
      let res = await data.json();
      if (res.success) {
        alert("Product successfully updated");
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card text-white bg-dark border-light">
              <h5 className="card-header">Product Edit</h5>
              <div className="card-body">
                <center>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="category">Category</label>
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="form-control bg-dark border-light text-white"
                      >
                        <option value="">---select category---</option>
                        {categorydata.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="form-control bg-dark border-light text-white"
                        id="name"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="image">Image</label>
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="form-control bg-dark border-light text-white"
                        id="image"
                      />
                      {singleimage && (
                        <img
                          src={singleimage}
                          alt="Product Preview"
                          width="100"
                          className="mt-2"
                        />
                      )}
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className="form-control bg-dark border-light text-white"
                        id="price"
                        placeholder="Enter price"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="form-control bg-dark border-light text-white"
                        id="description"
                        placeholder="Enter description"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="status">Market status</label>
                      <select
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-control bg-dark border-light text-white"
                        id="status"
                      >
                        <option value="">---select status---</option>
                        {mstatus.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-light mt-3">
                      Submit
                    </button>
                  </form>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
