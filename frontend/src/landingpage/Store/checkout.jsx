import React from "react";
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div className="container margin">
      <div className="row">
        <div className="col-12 col-lg-6 text-center">
          <img
            src="/media/images/shopping.png"
            alt="shopping-image"
            style={{ width: "60%" }}
          />
        </div>
        <div className="col-12 col-lg-6 text-center mt-5">
          <h5>
            "Ready to build? Your construction materials are now in your cart.
            Click here to review and finalize your order."
          </h5>
          <Link to={`/cart`}>
            <button className="btn btn-warning mt-3">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
