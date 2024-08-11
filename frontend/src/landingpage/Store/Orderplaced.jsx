import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // React Icons for a check icon

function Orderplaced() {
  return (
    <div className="container text-center mt-5 mb-5 margin">
      <div className="mb-4">
        <FaCheckCircle size={80} color="green" />
      </div>
      <h3 className="text-success display-5 fw-bold">
        Order Placed Successfully!
      </h3>
      <p className="mt-3 fs-5">
        You will shortly receive a call from our agent to confirm the site
        location and payment details.
      </p>
      <p className="mt-2 fs-6">Thank you for shopping with Nirmaan-Mitra!</p>
      <div className="mt-4">
        <Link to="/store" className="btn btn-warning me-3">
          Continue Shopping
        </Link>
        <Link to="/cart" className="btn btn-warning">
          View Orders
        </Link>
      </div>
    </div>
  );
}

export default Orderplaced;
