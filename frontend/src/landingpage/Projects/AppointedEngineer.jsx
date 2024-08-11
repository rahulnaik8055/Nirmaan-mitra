import React from "react";
import { Link } from "react-router-dom";

function AppointedEngineer({ engineers }) {
  return (
    <div className="mt-5">
      <h2 className="text-warning display-4 fw-bold shadow-text fs-2 text-center mb-5">
        Engineers Assigned for Project
      </h2>
      <div className="row">
        {engineers.map((engineer) => (
          <div key={engineer._id} className="col-md-4 mb-4">
            <div className="card  border-light">
              <div className="card-img-container d-flex justify-content-center align-items-center">
                <img
                  src={engineer.engineerProfile?.image}
                  alt={engineer.username}
                  className="card-img-top rounded-circle mt-5 mb-5"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{engineer.username || "Unknown"}</h5>
                <Link to={`/engineerprofile/${engineer._id}`}>
                  <button className="btn btn-warning">View Profile</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointedEngineer;
