import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const getUser = async () => {
    try {
      let data = await fetch(
        `http://localhost:8000/users/getprofile?id=${auth?.user?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let res = await data.json();
      if (res.success) {
        setName(res.user.name);
        setEmail(res.user.email);
        setPassword(res.user.password);
        setPhone(res.user.phone);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `http://localhost:8000/users/updateprofile?id=${auth?.user?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, phone }),
        }
      );
      let res = await response.json();
      if (res.success) {
        toast.success("Profile successfully updated");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newpassword === confirmpassword) {
      try {
        let response = await fetch(
          `http://localhost:8000/users/changepassword?id=${auth?.user?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: newpassword }),
          }
        );
        let res = await response.json();
        if (res.success) {
          toast.success("Password successfully changed");
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("New password and confirm password do not match");
    }
  };

  return (
    <div className="bg-dark text-light">
      <Header />
      <br />
      <br />
      <br />
      <br />
      <div
        className="container"
        style={{
          backgroundColor: "#212529",
          color: "white",
          padding: "80px",
          borderRadius: "10px",
        }}
      >
        <div className="row">
          <div className="col-lg-5">
            <div
              className="card"
              style={{ backgroundColor: "#212529", border: "1px solid white" }}
            >
              <center>
                <form onSubmit={handleProfileUpdate}>
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#212529",
                      border: "1px solid white",
                      color: "white",
                    }}
                  >
                    Change Profile
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="form-control"
                        placeholder="Enter Name"
                        style={{
                          backgroundColor: "#212529",
                          color: "white",
                          borderColor: "white",
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        disabled
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="form-control"
                        placeholder="Enter Email"
                        style={{
                          backgroundColor: "#212529",
                          color: "white",
                          borderColor: "white",
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        disabled
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="form-control"
                        placeholder="Enter Password"
                        style={{
                          backgroundColor: "#212529",
                          color: "white",
                          borderColor: "white",
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="number"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        className="form-control"
                        placeholder="Enter Phone"
                        style={{
                          backgroundColor: "#212529",
                          color: "white",
                          borderColor: "white",
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-success">Change Profile</button>
                  </div>
                </form>
              </center>
            </div>
          </div>

          <div className="col-lg-6">
            <center>
              <div
                className="card"
                style={{
                  backgroundColor: "#212529",
                  border: "1px solid white",
                }}
              >
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#212529",
                    border: "1px solid white",
                    color: "white",
                  }}
                >
                  Change Password
                </div>
                <div className="card-body">
                  <form onSubmit={handleChangePassword}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        disabled
                        value={email}
                        className="form-control"
                        placeholder="Enter Email"
                        style={{
                          backgroundColor: "#212529",
                          color: "white",
                          borderColor: "white",
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newpassword}
                        className="form-control"
                        placeholder="Enter new password"
                        style={{
                          backgroundColor: "#212529",
                          color: "white",
                          borderColor: "white",
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmpassword}
                        className="form-control"
                        placeholder="Enter Password"
                        style={{
                          backgroundColor: "#212529",
                          color: "white",
                          borderColor: "white",
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-success">
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
