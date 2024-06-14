import React, { useEffect, useState } from "react";
import Leftsidebar from "../Leftsidebar";
import Header from "../../../component/Header";
import { useAuth } from "../../../context/Auth";
import { Link, useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [categorydata, setCategoryData] = useState([]);
  const [mstatus, setMStatus] = useState(["best", "latest", "upcomming"]);

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

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

  useEffect(() => {
    getCategory();
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

      let data = await fetch(`http://localhost:8000/admin/product/addproduct`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
        body: formData,
      });
      let res = await data.json();
      if (res.success) {
        console.log(res);
        alert("Product successfully added");
      }
      setCategory("");
      setName("");
      setImage("");
      setPrice("");
      setDescription("");
      setStatus("");
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <div className="glassmorphism rounded-lg bg-dark">
      <Header />
      <br />
      <br />
      <div
        className="container mt-5"
        style={{ backgroundColor: "#212529", color: "white" }}
      >
        <div className="row justify-content-center">
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
                Product Add
              </h5>

              <div className="d-flex justify-content-end p-3">
                <Link to={`/admin/product`}>
                  <button type="button" className="btn btn-success">
                    View
                  </button>
                </Link>
              </div>

              <div className="card-body">
                <center>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="form-group">
                        <label
                          htmlFor="category"
                          className="form-label"
                          style={{ color: "white" }}
                        >
                          Product category
                        </label>
                        <select
                          onChange={(e) => setCategory(e.target.value)}
                          value={category}
                          id="category"
                          className="form-control"
                          style={{
                            backgroundColor: "#212529",
                            color: "white",
                            border: "1px solid white",
                          }}
                        >
                          <option>--- select ---</option>
                          {categorydata.map((cat) => {
                            return <option value={cat._id}>{cat.name}</option>;
                          })}
                        </select>
                      </div>
                      <div className="form-group mt-3">
                        <label
                          htmlFor="name"
                          className="form-label"
                          style={{ color: "white" }}
                        >
                          Product name
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          className="form-control"
                          id="name"
                          placeholder="Enter Name"
                          style={{
                            backgroundColor: "#212529",
                            color: "white",
                            border: "1px solid white",
                          }}
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label
                          htmlFor="image"
                          className="form-label"
                          style={{ color: "white" }}
                        >
                          Image
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                          id="image"
                          className="form-control"
                          style={{
                            backgroundColor: "#212529",
                            color: "white",
                            border: "1px solid white",
                          }}
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label
                          htmlFor="price"
                          className="form-label"
                          style={{ color: "white" }}
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                          className="form-control"
                          id="price"
                          placeholder="Enter price"
                          style={{
                            backgroundColor: "#212529",
                            color: "white",
                            border: "1px solid white",
                          }}
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label
                          htmlFor="desc"
                          className="form-label"
                          style={{ color: "white" }}
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          className="form-control"
                          id="desc"
                          placeholder="Enter description"
                          style={{
                            backgroundColor: "#212529",
                            color: "white",
                            border: "1px solid white",
                          }}
                        />
                      </div>

                      <div className="form-group mt-3">
                        <label
                          htmlFor="status"
                          className="form-label"
                          style={{ color: "white" }}
                        >
                          Market status
                        </label>
                        <select
                          onChange={(e) => setStatus(e.target.value)}
                          value={status}
                          id="status"
                          className="form-control"
                          style={{
                            backgroundColor: "#212529",
                            color: "white",
                            border: "1px solid white",
                          }}
                        >
                          <option>--- select ---</option>
                          {mstatus.map((st) => {
                            return <option value={st}>{st}</option>;
                          })}
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">
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

export default AdminAddProduct;
