// Project.js
import React from "react";
import { Link } from "react-router-dom";

function Project({ image, ProjectName, ProjectId }) {
  return (
    <div className="col-md-4">
      <div className="card mb-4 mt-4">
        <img
          src={image}
          className="card-img-top"
          alt="project image"
          style={{ height: "13rem", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{ProjectName}</h5>

          <Link to={`/projects/${ProjectId}`}>
            <button className="btn btn-warning">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Project;
