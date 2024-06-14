import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../component/Header";
import Slider from "../component/Slider";
import Footer from "../component/Footer";
import { useAuth } from "../context/Auth";

const Home = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (!auth?.token) {
      toast.error("Please login");
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <>
      <Header />
      <br />
      <br />
      <Slider />
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=500&w=500"
              className="img-fluid"
              alt="Image 1"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2>Latest Summer Collection</h2>
            <p>
              Explore our exclusive summer collection, featuring the latest
              trends and styles to keep you cool and fashionable. From breezy
              dresses to stylish shorts, our summer lineup has everything you
              need to make a statement this season.
            </p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2>Elegant Evening Wear</h2>
            <p>
              Step into elegance with our stunning evening wear collection.
              Perfect for any special occasion, our dresses are designed to make
              you feel confident and beautiful. Discover a variety of styles,
              from classic gowns to modern silhouettes.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1658506769769-1333c0daf55d?q=500&w=500"
              className="img-fluid"
              alt="Image 2"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1690340192770-3460a6c5067c?q=500&w=500"
              className="img-fluid"
              alt="Image 3"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2>Casual Everyday Essentials</h2>
            <p>
              Stay comfortable and chic with our casual everyday essentials.
              Whether you're running errands or enjoying a day out, our
              collection offers versatile pieces that blend style and comfort
              effortlessly. Find your new favorite go-to outfits.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
