import React from "react";

function WorkInfo() {
  return (
    <div className="container worker">
      <div className="row ">
        <div className="col-12 col-lg-6  text-center">
          <img
            src="/media/images/worker.jpg"
            alt="worker-image"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-12 col-lg-6 text-center mt-5 margin">
          <h3 className="mt-5">Discover Jobs in Construction</h3>
          <p>
            "Discover tailored construction jobs and connect directly with top
            contractors on Nirmaan Mitra. Your next opportunity starts here."
          </p>
        </div>
      </div>
    </div>
  );
}

export default WorkInfo;
