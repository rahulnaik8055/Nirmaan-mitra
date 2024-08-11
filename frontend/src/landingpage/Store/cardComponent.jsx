import React, { useState } from "react";

const CardComponent = ({ imgSrc, title, Price, Quantity, addToCart }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(); // Call the addToCart function passed from parent
    setAddedToCart(true); // Update state to reflect item added to cart

    // Set a timeout to reset addedToCart state after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  return (
    <div className="col-md-4">
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
          {addedToCart ? (
            <button className="btn btn-secondary" disabled>
              Added
            </button>
          ) : (
            <button className="btn btn-warning" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
