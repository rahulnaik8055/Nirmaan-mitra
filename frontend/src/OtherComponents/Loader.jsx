import React from "react";

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <img
        src="/media/images/loader.png"
        alt="...loading"
        className="spinner"
        style={{ height: "10rem", width: "10rem" }}
      />
    </div>
  );
}

export default LoadingSpinner;
