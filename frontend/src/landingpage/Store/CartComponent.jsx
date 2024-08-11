import React from "react";

const CartComponent = ({ imgSrc, title, Price, Quantity, onRemove }) => {
  return (
    <div className="card mb-4 mt-4">
      <img
        src={imgSrc}
        className="card-img-top"
        alt="product-Image"
        style={{ height: "13rem", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          &#8377;{Price} / {Quantity}
        </p>
        <button className="btn btn-danger" onClick={onRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
