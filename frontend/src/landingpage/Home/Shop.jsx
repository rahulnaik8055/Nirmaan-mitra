import React from "react";
import { Link } from "react-router-dom";

function Shop() {
  return (
    <div className="container shop">
      <div className="row">
        <div className="col-12 col-lg-6 mb-5">
          <img
            src="/media/images/shop.png"
            alt="shop-image"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-12 col-lg-6 text-center mt-5">
          <h3 className="mt-5">Explore our shop</h3>
          <p>
            "Welcome to our comprehensive construction shop, your ultimate
            destination for top-quality building materials, tools, and
            equipment. Explore our diverse range crafted to cater to
            professionals and enthusiasts alike. Whether you're planning a
            large-scale project or tackling a home improvement task, discover
            the reliability and innovation that make us your trusted partner in
            construction."
          </p>
          <Link to="/store">
            <button className="btn btn-warning btn-lg">Shop now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Shop;
