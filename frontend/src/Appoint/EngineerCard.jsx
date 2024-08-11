import React from "react";
import { Link } from "react-router-dom";

function EngineerCard({ engineer, onAppointEngineer }) {
  const handleAppoint = () => {
    if (engineer) {
      onAppointEngineer(engineer.engineerProfile._id);
    }
  };

  return (
    <div className="card">
      <img
        src={engineer?.engineerProfile?.image}
        alt={engineer?.username}
        className="card-img-top"
        style={{ height: "13rem", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{engineer?.username}</h5>
        <div className="d-flex justify-content-between">
          <button className="btn btn-warning" onClick={handleAppoint}>
            Appoint
          </button>
          <Link to={`/engineerprofile/${engineer._id}`}>
            <button className="btn btn-warning">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EngineerCard;
