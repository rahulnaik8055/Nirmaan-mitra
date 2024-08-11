import React from "react";

function NotFound() {
  return (
    <div className="container notfound text-center">
      <div className="row">
        <div className="col-12 col-lg-6">
          <h1 className="text-warning display-4 fw-bold shadow-text fs-2 mt-5">
            404
          </h1>
          <h1 className="text-warning display-4 fw-bold shadow-text fs-1">
            Page Not Found
          </h1>
        </div>
        <div className="col-12 col-lg-6">
          <img
            src="/media/images/notfound.png"
            alt="notfound"
            style={{ width: "50%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
