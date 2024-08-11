import React from "react";

function EngineerInfo() {
  return (
    <div className="container mb-5">
      <div className="row mb-5">
        <div className="col-12 col-lg-6 text-center">
          <img
            src="/media/images/civil-engineer.png"
            alt="engineer.png"
            style={{ width: "100%" }}
            className="mb-5"
          />
        </div>
        <div className="col-12 col-lg-6 text-center mt-5">
          <h3 className="mt-5">"Showcase Your Engineering Excellence"</h3>
          <p>
            "Highlight your engineering expertise and projects on our platform.
            Connect with potential clients and showcase your skills to land your
            next project seamlessly."
          </p>
        </div>
      </div>
    </div>
  );
}

export default EngineerInfo;
