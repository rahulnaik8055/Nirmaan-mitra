import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../../../config";

const OwnerProfile = () => {
  const { ownerId } = useParams();
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await axios.get(
          `${config.apiBaseUrl}/users/${ownerId}`
        );
        setOwner(response.data);
      } catch (error) {
        setError("Error fetching owner details");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerDetails();
  }, [ownerId]);

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  if (!owner) {
    return <p className="text-center mt-5">Owner details not available</p>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mt-4 mb-5"></div>
      <div className="row">
        <div className="col-12 col-lg-6 text-center mb-4">
          <img
            src={owner.employerProfile.image}
            alt="company-profile"
            className="img-fluid rounded border mb-3 p-3"
            style={{ maxHeight: "340px" }}
          />
        </div>
        <div className="col-12 col-lg-6">
          <div className="card p-4">
            <div className="card-body">
              <h3 className="text-warning display-4 fw-bold shadow-text fs-1 text-center">
                Owner Profile
              </h3>
              <p className="card-text">
                <strong>Username:</strong> {owner.username}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {owner.email}
              </p>
              <p className="card-text">
                <strong>Company Name:</strong>{" "}
                {owner.employerProfile.companyName}
              </p>
              <p className="card-text">
                <strong>Description:</strong>{" "}
                {owner.employerProfile.description}
              </p>
              <p className="card-text">
                <strong>Location:</strong> {owner.employerProfile.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
