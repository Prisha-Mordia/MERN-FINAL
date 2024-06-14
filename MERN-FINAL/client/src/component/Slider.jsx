import React from "react";

const Slider = () => {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://sslimages.shoppersstop.com/sys-master/root/h9b/h22/32855782424606/eoss-main-web--without-preview-2024-06--07.jpg"
            className="d-block w-100"
            style={{ backgroundSize: "contain" }}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://sslimages.shoppersstop.com/sys-master/root/hb2/hd9/32834870411294/Private_top-banner-web_36-e3.jpg"
            className="d-block w-100"
            style={{ backgroundSize: "contain" }}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://sslimages.shoppersstop.com/sys-master/root/h07/h13/32834869592094/watches_top-banner-web_74-je9.jpg"
            className="d-block w-100"
            style={{ backgroundSize: "contain" }}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://sslimages.shoppersstop.com/sys-master/root/h06/hd2/32834866479134/women-westernwear_top-banner-web_74-w-e3.jpg"
            className="d-block w-100"
            style={{ backgroundSize: "contain" }}
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://sslimages.shoppersstop.com/sys-master/root/h89/hc7/32834866151454/women-Indianwear_top-banner-web_91-hux.jpg"
            className="d-block w-100"
            style={{ backgroundSize: "contain" }}
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
